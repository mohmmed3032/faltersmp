"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ─── FIELD TYPES ─────────────────────────────────────────────
interface FieldOption {
  value: string;
  label: string;
}

interface Field {
  id: string;
  label: string;
  type: "text" | "textarea" | "radio";
  helper?: string;
  placeholder?: string;
  options?: FieldOption[];
  required: boolean;
}

// ─── ROLE CONFIG ──────────────────────────────────────────────
const ROLES = [
  {
    id: "builder",
    label: "Builder",
    title: "Falter Events Builder Application",
    subtitle: "Official Falter Events Application",
    fields: [
      {
        id: "discordUsername",
        label: "What's your Discord Username?",
        type: "text" as const,
        required: true,
      },
      {
        id: "minecraftUsername",
        label: "What's your Minecraft Username?",
        type: "text" as const,
        required: true,
      },
      {
        id: "activity",
        label: "How active will you be?",
        type: "radio" as const,
        required: true,
        options: [
          { value: "4 hours a day", label: "4 hours a day" },
          { value: "3 hours a day", label: "3 hours a day" },
          { value: "2 hours a day", label: "2 hours a day" },
          { value: "1 hour a day", label: "1 hour a day" },
          { value: "less than an hour a day", label: "less than an hour a day" },
        ],
      },
      {
        id: "buildingExperience",
        label: "What is ur building expirience",
        type: "textarea" as const,
        helper: "[1 PARAGRAPH min.]",
        required: true,
      },
      {
        id: "minecraftEdition",
        label: "What is ur Minecraft Edition",
        type: "radio" as const,
        required: true,
        options: [
          { value: "Java Edition", label: "Java Edition" },
          { value: "Bedrock Edition", label: "Bedrock Edition" },
          { value: "MCPE", label: "MCPE" },
        ],
      },
      {
        id: "commitment",
        label: "If you want to be a builder, u have to always be online during a building session , if u miss 3 sessions in a row ur role will be perm tooken away from you. Are you SURE you want this role?",
        type: "radio" as const,
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
      {
        id: "age",
        label: "How old are you",
        type: "text" as const,
        required: true,
      },
    ],
  },
  {
    id: "trusted",
    label: "Trusted",
    title: "Trusted Person Application for Falter Events",
    subtitle: "This is the Official application for trusted of Falter Events",
    fields: [
      {
        id: "discordUsername",
        label: "What's your discord username?",
        type: "text" as const,
        placeholder: "ex. Minecrafter214",
        required: true,
      },
      {
        id: "minecraftUsername",
        label: "What's your MineCraft username?",
        type: "text" as const,
        placeholder: "ex. DuckyGos",
        required: false,
      },
      {
        id: "age",
        label: "How old are you?",
        type: "text" as const,
        required: true,
      },
      {
        id: "whyTrusted",
        label: "Why do you think u can be a trusted person",
        type: "textarea" as const,
        helper: "[1 paragraph minimum]",
        required: false,
      },
      {
        id: "leakAcknowledgement",
        label: "You realize any kind of leakes ,trolling ,messing around etc. will result of u being removed or perm banned",
        type: "radio" as const,
        required: true,
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
      {
        id: "activity",
        label: "How active will you be in the day?",
        type: "radio" as const,
        required: true,
        options: [
          { value: "100%", label: "100%" },
          { value: "85%", label: "85%" },
          { value: "65%", label: "65%" },
          { value: "50%", label: "50%" },
          { value: "35%", label: "35%" },
          { value: "20%", label: "20%" },
          { value: "5%", label: "5%" },
        ],
      },
      {
        id: "whyBetter",
        label: "Why do you think ur apply is better than others",
        type: "text" as const,
        required: true,
      },
      {
        id: "anythingElse",
        label: "Anything else you want us to know?",
        type: "text" as const,
        required: false,
      },
    ],
  },
] as const;

type FormData = Record<string, string>;

// ─── RADIO COMPONENT ─────────────────────────────────────────
function RadioGroup({
  field,
  value,
  onChange,
  error,
}: {
  field: Field;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      {field.options?.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-all duration-200 ${
            value === opt.value
              ? "border-crimson/60 bg-crimson/10"
              : "border-ash-muted/15 bg-ember-black hover:border-ash-muted/30"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              value === opt.value ? "border-crimson" : "border-ash-muted/30"
            }`}
          >
            {value === opt.value && (
              <div className="w-2 h-2 rounded-full bg-crimson" />
            )}
          </div>
          <span className="font-body text-sm text-ash">{opt.label}</span>
          <input
            type="radio"
            name={field.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
        </label>
      ))}
      {error && (
        <p className="font-body text-[11px] text-blaze mt-1">{error}</p>
      )}
    </div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────
export default function ApplyPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const role = ROLES.find((r) => r.id === selectedRole);
  const fields = role ? (role.fields as unknown as Field[]) : [];

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!selectedRole) {
      errs._role = "Please select a role.";
      setErrors(errs);
      return false;
    }

    for (const field of fields) {
      if (field.required) {
        const val = formData[field.id]?.trim() ?? "";
        if (val.length === 0) {
          errs[field.id] = `${field.label} is required.`;
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole, ...formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerError(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  }

  // ─── SUCCESS STATE ────────────────────────────────────────
  if (status === "success") {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] bg-crimson/6 top-[10%] left-[-10%]" />
        <div className="ambient-glow w-[300px] h-[300px] bg-molten/4 bottom-[10%] right-[-5%]" />
        <div className="section-vignette" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-lg"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-crimson to-molten flex items-center justify-center">
            <svg className="w-8 h-8 text-ash" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-[clamp(32px,5vw,56px)] tracking-[0.08em] text-ash mb-4">
            APPLICATION<br />
            <span className="text-ash-dim">SUBMITTED</span>
          </h1>
          <p className="font-body text-sm text-ash-dim leading-relaxed mb-8">
            Your application for <span className="text-ash">{role?.label}</span> has been
            received. We&apos;ll review it on Discord — keep an eye on your DMs.
          </p>
          <a
            href="/"
            className="font-body text-[11px] tracking-[0.2em] uppercase border border-ash-muted/30 text-ash px-8 py-3.5 hover:border-ash-muted/60 transition-colors duration-300 inline-block"
          >
            Back to Home
          </a>
        </motion.div>
      </section>
    );
  }

  // ─── MAIN FORM ────────────────────────────────────────────
  return (
    <section className="relative min-h-screen px-4 md:px-8 pt-32 md:pt-40 pb-24 overflow-hidden">
      <div className="ambient-glow w-[500px] h-[500px] bg-crimson/6 top-[10%] left-[-10%]" />
      <div className="ambient-glow w-[300px] h-[300px] bg-molten/4 bottom-[10%] right-[-5%]" />
      <div className="section-vignette" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="font-body text-[10px] font-light tracking-[0.3em] uppercase text-ash-muted block mb-4">
            Applications
          </span>
          <h1 className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.08em] leading-[0.9] text-ash mb-4">
            APPLY FOR<br />
            <span className="text-ash-dim">A ROLE</span>
          </h1>
          <p className="font-body text-sm text-ash-dim leading-relaxed max-w-md">
            Select a role below, fill out the form, and your application will be
            sent directly to the Falter SMP staff team on Discord.
          </p>
        </motion.div>

        {/* Role selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10"
        >
          <label className="font-body text-[10px] font-light tracking-[0.3em] uppercase text-ash-muted block mb-4">
            Select a role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRole(r.id);
                  setFormData({});
                  setErrors({});
                  if (errors._role) setErrors((prev) => ({ ...prev, _role: "" }));
                }}
                className={`text-left p-5 border transition-all duration-300 ${
                  selectedRole === r.id
                    ? "border-crimson bg-crimson/10"
                    : "border-ash-muted/15 bg-ember-black hover:border-ash-muted/30"
                }`}
              >
                <h3 className="font-display text-lg tracking-[0.1em] text-ash mb-1">
                  {r.label.toUpperCase()}
                </h3>
                <p className="font-body text-[11px] text-ash-dim leading-relaxed">
                  {r.subtitle}
                </p>
              </button>
            ))}
          </div>
          {errors._role && (
            <p className="font-body text-[11px] text-blaze mt-2">{errors._role}</p>
          )}
        </motion.div>

        {/* Form */}
        {role && (
          <motion.form
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Role-specific header */}
            <div className="mb-8">
              <h2 className="font-display text-2xl tracking-[0.08em] text-ash mb-1">
                {role.title}
              </h2>
              <p className="font-body text-[11px] text-ash-dim">
                {role.subtitle}
              </p>
            </div>

            {fields.map((field) => (
              <div key={field.id}>
                <label className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-ash-muted block mb-2">
                  {field.label}
                  {field.required && <span className="text-blaze ml-1">*</span>}
                </label>
                {field.helper && (
                  <p className="font-body text-[10px] text-ash-muted/60 mb-2 -mt-1">
                    {field.helper}
                  </p>
                )}

                {field.type === "radio" ? (
                  <RadioGroup
                    field={field}
                    value={formData[field.id] ?? ""}
                    onChange={(val) => updateField(field.id, val)}
                    error={errors[field.id]}
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.id] ?? ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={5}
                    className={`w-full bg-ember-black border px-4 py-3 font-body text-sm text-ash placeholder:text-ash-muted/40 focus:outline-none focus:border-crimson/60 transition-colors resize-none ${
                      errors[field.id] ? "border-blaze" : "border-ash-muted/15"
                    }`}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.id] ?? ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full bg-ember-black border px-4 py-3 font-body text-sm text-ash placeholder:text-ash-muted/40 focus:outline-none focus:border-crimson/60 transition-colors ${
                      errors[field.id] ? "border-blaze" : "border-ash-muted/15"
                    }`}
                  />
                )}

                {errors[field.id] && field.type !== "radio" && (
                  <p className="font-body text-[11px] text-blaze mt-1">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            {/* Server error */}
            {serverError && (
              <div className="border border-blaze/30 bg-blaze/5 p-4">
                <p className="font-body text-[11px] text-blaze">{serverError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-8 py-3.5 hover:bg-blaze transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
