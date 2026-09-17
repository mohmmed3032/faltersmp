"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl tracking-[0.1em] text-ash text-center mb-8">
          ADMIN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-ash-muted block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              autoFocus
              className="w-full bg-ember-black border border-ash-muted/15 px-4 py-3 font-body text-sm text-ash placeholder:text-ash-muted/40 focus:outline-none focus:border-crimson/60 transition-colors"
            />
            {error && (
              <p className="font-body text-[11px] text-blaze mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-8 py-3 hover:bg-blaze transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
