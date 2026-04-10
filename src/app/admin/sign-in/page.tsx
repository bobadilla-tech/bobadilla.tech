"use client";

import { useState } from "react";
import { signIn } from "~/lib/auth-client";

export default function AdminSignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const result = await signIn.email({
			email,
			password,
			callbackURL: "/admin/messages",
		});

		if (result.error) {
			setError(result.error.message ?? "Sign in failed");
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				{/* Logo mark */}
				<div className="mb-8 text-center">
					<div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 border border-border-gold mb-4">
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-brand-gold"
						>
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
					</div>
					<p className="text-brand-primary/40 text-sm font-body">bobadilla.tech</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-surface border border-border rounded-2xl p-8"
				>
					<h1 className="font-heading text-xl font-semibold text-brand-primary mb-6">
						Admin sign in
					</h1>

					<div className="space-y-4 mb-6">
						<label className="block">
							<span className="text-brand-primary/60 text-xs font-medium uppercase tracking-wide">
								Email
							</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
								placeholder="you@bobadilla.tech"
								className="mt-2 block w-full bg-brand-bg border border-border rounded-lg px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:outline-none focus:border-border-gold transition-colors"
							/>
						</label>

						<label className="block">
							<span className="text-brand-primary/60 text-xs font-medium uppercase tracking-wide">
								Password
							</span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="current-password"
								placeholder="••••••••"
								className="mt-2 block w-full bg-brand-bg border border-border rounded-lg px-3.5 py-2.5 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:outline-none focus:border-border-gold transition-colors"
							/>
						</label>
					</div>

					{error && (
						<div
							role="alert"
							className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
						>
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-brand-gold text-brand-bg font-heading font-semibold text-sm py-2.5 rounded-lg hover:bg-brand-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
					>
						{loading ? "Signing in…" : "Sign in"}
					</button>
				</form>
			</div>
		</div>
	);
}
