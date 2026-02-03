"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
	language?: string;
	children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
	return (
		<SyntaxHighlighter
			style={vscDarkPlus}
			language={language || "text"}
			PreTag="div"
			customStyle={{
				margin: 0,
				borderRadius: "0.5rem",
				fontSize: "0.875rem",
			}}
		>
			{children}
		</SyntaxHighlighter>
	);
}
