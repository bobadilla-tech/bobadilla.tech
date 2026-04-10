export default function AdminRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-brand-bg text-brand-primary font-body min-h-screen">
				{children}
			</body>
		</html>
	);
}
