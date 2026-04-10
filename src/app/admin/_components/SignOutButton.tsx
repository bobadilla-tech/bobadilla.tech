"use client";

import { signOut } from "~/lib/auth-client";

export function SignOutButton() {
	return (
		<button
			onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/admin/sign-in"; } } })}
			className="text-xs text-brand-primary/40 hover:text-brand-primary/70 transition-colors"
		>
			Sign out
		</button>
	);
}
