"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(
	() => import("@/components/shaders/ShaderBackground"),
	{
		ssr: false,
		loading: () => (
			<div className="fixed inset-0 -z-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
		),
	}
);

export default ShaderBackground;
