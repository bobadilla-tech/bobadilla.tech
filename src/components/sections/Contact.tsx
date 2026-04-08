"use client";

import { useState, useMemo } from "react";
import { AlertCircle, Calendar, CheckCircle, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { motion } from "framer-motion";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CAL_LINKS, SOCIAL_LINKS } from "~/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

type FieldErrors = {
	name?: string;
	email?: string;
	company?: string;
	message?: string;
};

export default function Contact() {
	const t = useTranslations("Contact");

	const contactSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
				email: z.string().email(t("invalidEmail")),
				company: z.string().max(100, t("companyTooLong")).optional(),
				message: z
					.string()
					.min(10, t("messageTooShort"))
					.max(2000, t("messageTooLong")),
			}),
		[t]
	);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		message: "",
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
	const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
		{}
	);

	const validateField = (name: string, value: string) => {
		try {
			const fieldSchema =
				contactSchema.shape[name as keyof typeof contactSchema.shape];
			fieldSchema.parse(value);
			setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
		} catch (error) {
			if (error instanceof z.ZodError) {
				setFieldErrors((prev) => ({
					...prev,
					[name]: error.issues[0]?.message,
				}));
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");
		setFieldErrors({});

		try {
			contactSchema.parse(formData);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors: FieldErrors = {};
				error.issues.forEach((err) => {
					const field = err.path[0] as keyof FieldErrors;
					if (field) errors[field] = err.message;
				});
				setFieldErrors(errors);
				setStatus("error");
				setErrorMessage(t("errorSummary"));
				return;
			}
		}

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = (await response.json()) as { message?: string };

			if (!response.ok) {
				throw new Error(data.message || "Failed to submit form");
			}

			setStatus("success");
			setFormData({ name: "", email: "", company: "", message: "" });
			setFieldErrors({});
			setTouchedFields({});
			setTimeout(() => setStatus("idle"), 5000);
		} catch (error) {
			setStatus("error");
			setErrorMessage(
				error instanceof Error ? error.message : "Something went wrong"
			);
			setTimeout(() => setStatus("idle"), 5000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (touchedFields[name]) {
			validateField(name, value);
		}
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTouchedFields((prev) => ({ ...prev, [name]: true }));
		validateField(name, value);
	};

	const inputBase =
		"w-full px-4 py-3 bg-surface border rounded-lg text-brand-primary placeholder-brand-primary/30 focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-body";

	return (
		<section id="contact" className="relative py-24 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 flex flex-col items-center">
					<SectionHeader
						heading={
							<>
								{t("heading1")}{" "}
								<span className="text-brand-gold">{t("heading2")}</span>
							</>
						}
						subtitle={t("subtitle")}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="p-8 bg-surface border border-border rounded-2xl">
							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-6">
								{t("formHeading")}
							</h3>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="block font-body text-sm font-medium text-brand-primary/70 mb-2"
									>
										{t("nameLabel")}
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={status === "loading"}
										className={`${inputBase} ${
											fieldErrors.name
												? "border-red-500/50 focus:border-red-500"
												: "border-border focus:border-brand-gold/50"
										}`}
										placeholder={t("namePlaceholder")}
									/>
									{fieldErrors.name && (
										<p className="mt-1 font-body text-sm text-red-400">
											{fieldErrors.name}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="email"
										className="block font-body text-sm font-medium text-brand-primary/70 mb-2"
									>
										{t("emailLabel")}
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={status === "loading"}
										className={`${inputBase} ${
											fieldErrors.email
												? "border-red-500/50 focus:border-red-500"
												: "border-border focus:border-brand-gold/50"
										}`}
										placeholder={t("emailPlaceholder")}
									/>
									{fieldErrors.email && (
										<p className="mt-1 font-body text-sm text-red-400">
											{fieldErrors.email}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="company"
										className="block font-body text-sm font-medium text-brand-primary/70 mb-2"
									>
										{t("companyLabel")}
									</label>
									<input
										type="text"
										id="company"
										name="company"
										value={formData.company}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={status === "loading"}
										className={`${inputBase} ${
											fieldErrors.company
												? "border-red-500/50 focus:border-red-500"
												: "border-border focus:border-brand-gold/50"
										}`}
										placeholder={t("companyPlaceholder")}
									/>
									{fieldErrors.company && (
										<p className="mt-1 font-body text-sm text-red-400">
											{fieldErrors.company}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="message"
										className="block font-body text-sm font-medium text-brand-primary/70 mb-2"
									>
										{t("messageLabel")}
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										onBlur={handleBlur}
										disabled={status === "loading"}
										rows={4}
										className={`${inputBase} resize-none ${
											fieldErrors.message
												? "border-red-500/50 focus:border-red-500"
												: "border-border focus:border-brand-gold/50"
										}`}
										placeholder={t("messagePlaceholder")}
									/>
									{fieldErrors.message && (
										<p className="mt-1 font-body text-sm text-red-400">
											{fieldErrors.message}
										</p>
									)}
								</div>

								{status === "success" && (
									<div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
										<CheckCircle className="size-5 text-green-400 shrink-0" />
										<p className="font-body text-green-400 text-sm">
											{t("successMessage")}
										</p>
									</div>
								)}

								{status === "error" && (
									<div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
										<AlertCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
										<p className="font-body text-red-400 text-sm">
											{errorMessage}
										</p>
									</div>
								)}

								<Button
									type="submit"
									loading={status === "loading"}
									variant="gold"
									className="w-full justify-center"
								>
									{status === "loading" ? t("sendingButton") : t("sendButton")}
								</Button>
							</form>
						</div>
					</motion.div>

					{/* Contact Info & CTA */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						{/* Book a Call Card */}
						<div className="p-8 bg-brand-gold/10 border border-border-gold rounded-2xl">
							<Calendar className="size-10 text-brand-gold mb-4" />
							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-2">
								{t("bookCallHeading")}
							</h3>
							<p className="font-body text-brand-primary/60 mb-4">
								{t("bookCallDesc")}
							</p>
							<p className="font-body text-sm text-brand-primary/40 mb-6">
								{t("bookCallAvailability")}
							</p>
							<div className="space-y-3">
								<Button
									href={CAL_LINKS.ale}
									variant="gold"
									className="w-full justify-center"
								>
									{t("scheduleWithAle")}
								</Button>
								<Button
									href={CAL_LINKS.eliaz}
									variant="ghost"
									size="sm"
									className="w-full justify-center"
								>
									{t("enterpriseCTO")}
								</Button>
							</div>
						</div>

						{/* Contact Methods */}
						<div className="p-8 bg-surface border border-border rounded-2xl space-y-6">
							<h3 className="font-heading text-2xl font-bold text-brand-primary">
								{t("getInTouchHeading")}
							</h3>

							<a
								href="mailto:ale@bobadilla.tech"
								className="flex items-center gap-4 font-body text-brand-primary/60 hover:text-brand-primary transition-colors duration-200"
							>
								<Mail className="size-5 text-brand-gold" />
								ale@bobadilla.tech
							</a>

							<a
								href="mailto:eliaz@bobadilla.tech"
								className="flex items-center gap-4 font-body text-brand-primary/60 hover:text-brand-primary transition-colors duration-200"
							>
								<Mail className="size-5 text-brand-gold" />
								eliaz@bobadilla.tech
							</a>

							<div className="pt-4 border-t border-border">
								<p className="font-body text-brand-primary/40 text-sm mb-4">
									{t("followUs")}
								</p>
								<div className="flex gap-4">
									<a
										href={SOCIAL_LINKS.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-surface rounded-lg hover:bg-brand-gold/10 text-brand-primary/50 hover:text-brand-gold transition-all duration-200"
									>
										<Linkedin className="size-5" />
									</a>
									<a
										href={SOCIAL_LINKS.github}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-surface rounded-lg hover:bg-brand-gold/10 text-brand-primary/50 hover:text-brand-gold transition-all duration-200"
									>
										<Github className="size-5" />
									</a>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
