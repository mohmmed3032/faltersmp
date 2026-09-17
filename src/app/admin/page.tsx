"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  role: string;
  discord_username: string;
  answers: Record<string, string>;
  status: string;
  created_at: string;
  decided_at: string | null;
  decided_by: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gold/20 text-gold border-gold/30",
  accepted: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  declined: "bg-blaze/20 text-blaze border-blaze/30",
};

const ROLE_LABELS: Record<string, string> = {
  builder: "Builder",
  trusted: "Trusted",
};

const FIELD_LABELS: Record<string, string> = {
  discordUsername: "Discord Username",
  minecraftUsername: "Minecraft Username",
  activity: "Activity Level",
  buildingExperience: "Building Experience",
  minecraftEdition: "Minecraft Edition",
  commitment: "Commitment Acknowledgement",
  age: "Age",
  whyTrusted: "Why Trusted?",
  leakAcknowledgement: "Leak Acknowledgement",
  whyBetter: "Why Better Than Others?",
  anythingElse: "Anything Else?",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [filterRole, setFilterRole] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchApplications = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterRole) params.set("role", filterRole);
    if (activeTab === "pending") {
      params.set("status", "pending");
    } else {
      // History: show accepted + declined
      // API doesn't support multiple statuses, so fetch all and filter client-side
      // Alternatively, pass no status filter and filter here
    }

    try {
      const url = activeTab === "pending"
        ? `/api/admin/applications?${params}`
        : `/api/admin/applications${filterRole ? `?role=${filterRole}` : ""}`;

      const res = await fetch(url);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();

      if (activeTab === "history") {
        // Filter to only accepted and declined
        setApplications(data.filter((app: Application) => app.status === "accepted" || app.status === "declined"));
      } else {
        setApplications(data);
      }
    } catch {
      console.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, [filterRole, activeTab, router]);

  useEffect(() => {
    setLoading(true);
    fetchApplications();
  }, [fetchApplications]);

  async function handleDecision(id: string, status: "accepted" | "declined") {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id
              ? { ...app, status, decided_at: new Date().toISOString(), decided_by: "admin" }
              : app
          )
        );
      }
    } catch {
      console.error("Failed to update application");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch {
      console.error("Failed to delete application");
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-void px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl tracking-[0.1em] text-ash">
            APPLICATIONS
          </h1>
          <button
            onClick={handleLogout}
            className="font-body text-[10px] tracking-[0.2em] uppercase text-ash-muted hover:text-ash transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-ash-muted/10">
          <button
            onClick={() => { setActiveTab("pending"); setExpandedId(null); }}
            className={`font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 border-b-2 transition-colors -mb-px ${
              activeTab === "pending"
                ? "border-crimson text-ash"
                : "border-transparent text-ash-muted hover:text-ash-dim"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => { setActiveTab("history"); setExpandedId(null); }}
            className={`font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 border-b-2 transition-colors -mb-px ${
              activeTab === "history"
                ? "border-crimson text-ash"
                : "border-transparent text-ash-muted hover:text-ash-dim"
            }`}
          >
            History
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={filterRole}
            onChange={(e) => { setFilterRole(e.target.value); setLoading(true); }}
            className="bg-ember-black border border-ash-muted/15 px-3 py-2 font-body text-xs text-ash focus:outline-none focus:border-crimson/60"
          >
            <option value="">All Roles</option>
            <option value="builder">Builder</option>
            <option value="trusted">Trusted</option>
          </select>

          <span className="font-body text-[10px] text-ash-muted ml-auto">
            {applications.length} application{applications.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Applications list */}
        {loading ? (
          <div className="text-center py-16">
            <p className="font-body text-sm text-ash-muted">Loading...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 border border-ash-muted/10">
            <p className="font-body text-sm text-ash-muted">
              {activeTab === "pending" ? "No pending applications." : "No past applications."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border border-ash-muted/10 bg-ember-black/50"
              >
                {/* Row header */}
                <div
                  className="flex items-center gap-3 sm:gap-4 px-4 py-3 cursor-pointer hover:bg-ash-muted/5 transition-colors"
                  onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                >
                  {/* Role badge */}
                  <span className="font-body text-[10px] tracking-[0.15em] uppercase text-ash-dim border border-ash-muted/20 px-2 py-0.5 flex-shrink-0">
                    {ROLE_LABELS[app.role] || app.role}
                  </span>

                  {/* Username */}
                  <span className="font-body text-sm text-ash flex-1 truncate">
                    {app.discord_username}
                  </span>

                  {/* Date */}
                  <span className="font-body text-[10px] text-ash-muted hidden sm:block flex-shrink-0">
                    {formatDate(app.created_at)}
                  </span>

                  {/* Actions */}
                  {app.status === "pending" ? (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        disabled={actionLoading === app.id}
                        onClick={(e) => { e.stopPropagation(); handleDecision(app.id, "accepted"); }}
                        className="font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors disabled:opacity-40"
                      >
                        {actionLoading === app.id ? "..." : "Accept"}
                      </button>
                      <button
                        disabled={actionLoading === app.id}
                        onClick={(e) => { e.stopPropagation(); handleDecision(app.id, "declined"); }}
                        className="font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 bg-blaze/10 text-blaze border border-blaze/30 hover:bg-blaze/20 transition-colors disabled:opacity-40"
                      >
                        {actionLoading === app.id ? "..." : "Decline"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1 border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(app); }}
                        className="font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 text-blaze/60 hover:text-blaze hover:bg-blaze/10 border border-transparent hover:border-blaze/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Expand chevron */}
                  <svg
                    className={`w-4 h-4 text-ash-muted transition-transform flex-shrink-0 ${expandedId === app.id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded answers */}
                {expandedId === app.id && (
                  <div className="px-4 pb-4 border-t border-ash-muted/10 pt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ash-muted block mb-1">
                          Discord Username
                        </span>
                        <span className="font-body text-sm text-ash">
                          {app.discord_username}
                        </span>
                      </div>
                      <div>
                        <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ash-muted block mb-1">
                          Submitted
                        </span>
                        <span className="font-body text-sm text-ash">
                          {formatDate(app.created_at)}
                        </span>
                      </div>
                    </div>

                    {Object.entries(app.answers)
                      .filter(([key]) => key !== "discordUsername")
                      .map(([key, value]) => (
                      <div key={key}>
                        <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ash-muted block mb-1">
                          {FIELD_LABELS[key] || key}
                        </span>
                        <p className="font-body text-sm text-ash leading-relaxed whitespace-pre-wrap">
                          {value}
                        </p>
                      </div>
                    ))}

                    {app.decided_at && (
                      <div className="pt-2 border-t border-ash-muted/10">
                        <span className="font-body text-[10px] text-ash-muted">
                          Decided by {app.decided_by} on {formatDate(app.decided_at)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => !deleteLoading && setDeleteTarget(null)}
          />

          {/* Modal */}
          <div className="relative bg-ember-black border border-ash-muted/15 p-6 max-w-sm w-full">
            <h3 className="font-display text-lg tracking-[0.08em] text-ash mb-2">
              DELETE APPLICATION
            </h3>
            <p className="font-body text-sm text-ash-dim leading-relaxed mb-6">
              Are you sure you want to delete the application from{" "}
              <span className="text-ash">{deleteTarget.discord_username}</span>?
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
                className="font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2 border border-ash-muted/20 text-ash-dim hover:text-ash hover:border-ash-muted/40 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2 bg-blaze/20 text-blaze border border-blaze/30 hover:bg-blaze/30 transition-colors disabled:opacity-40"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
