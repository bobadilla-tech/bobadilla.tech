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
		<div className="min-h-screen flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="bg-surface border border-border rounded-2xl p-8 w-full max-w-sm"
			>
				<h1 className="font-heading text-2xl font-bold text-brand-primary mb-6">
					Admin
				</h1>

				<label className="block mb-4">
					<span className="text-brand-primary/70 text-sm">Email</span>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
						className="mt-1 block w-full bg-brand-bg border border-border rounded-lg px-3 py-2 text-brand-primary focus:outline-none focus:border-border-gold"
					/>
				</label>

				<label className="block mb-6">
					<span className="text-brand-primary/70 text-sm">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="current-password"
						className="mt-1 block w-full bg-brand-bg border border-border rounded-lg px-3 py-2 text-brand-primary focus:outline-none focus:border-border-gold"
					/>
				</label>

				{error && (
					<p role="alert" className="text-red-400 text-sm mb-4">
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-brand-gold text-brand-bg font-heading font-semibold py-2 rounded-lg hover:bg-brand-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? "Signing in…" : "Sign In"}
				</button>
			</form>
		</div>
	);
}
