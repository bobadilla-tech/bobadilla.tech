"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ZodError } from "zod";
import {
	ArrowLeft,
	ArrowRight,
	Calculator,
	Check,
	CircleAlert,
	DollarSign,
	Globe,
	Info,
	Mail,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { CAL_LINKS } from "~/lib/constants";
import { ANIMATION_CONFIG, PRICING_STEPS } from "./constants";
import type { Selections } from "./types";
import {
	calculateStepTotal,
	calculateTotal,
	formatSelectionsSummary,
	getSelectedOptionsByStep,
} from "./utils";
import { validEmail } from "@/app/pricing/validation";

export default function PricingCalculator() {
	const t = useTranslations("PricingPage");
	const [currentStep, setCurrentStep] = useState(0);
	const [selections, setSelections] = useState<Selections>({});
	const [showSummary, setShowSummary] = useState(false);
	const [hoveredOption, setHoveredOption] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [saveError, setSaveError] = useState("");

	const validateEmail = useCallback(() => {
		try {
			validEmail(email);
			setIsValidEmail(true);
			setSaveError("");
		} catch (error) {
			setIsValidEmail(false);
			if (error instanceof ZodError) {
				setSaveError(error.issues[0].message);
			} else if (error instanceof Error) {
				setSaveError(error.message);
			} else {
				setSaveError("An unexpected error occurred during validation");
			}
		}
	}, [email]);

	const currentStepData = PRICING_STEPS[currentStep];
	const isMultiSelect = currentStepData?.multiSelect || false;

	const handleSelection = (optionId: string) => {
		const stepId = currentStep;

		if (isMultiSelect) {
			const currentSelections = selections[stepId] || [];
			const newSelections = currentSelections.includes(optionId)
				? currentSelections.filter((id) => id !== optionId)
				: [...currentSelections, optionId];

			setSelections({ ...selections, [stepId]: newSelections });
		} else {
			setSelections({ ...selections, [stepId]: [optionId] });
		}
	};

	const isSelected = (optionId: string) => {
		return (selections[currentStep] || []).includes(optionId);
	};

	const canProceed = () => {
		return (selections[currentStep] || []).length > 0;
	};

	const nextStep = () => {
		if (currentStep < PRICING_STEPS.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			setShowSummary(true);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const resetCalculator = () => {
		setCurrentStep(0);
		setSelections({});
		setShowSummary(false);
		setEmail("");
		setSaveError("");
		setIsValidEmail(false);
	};

	const saveEstimate = async () => {
		if (!email || !isValidEmail) {
			setSaveError("Please enter your email");
			return;
		}

		setIsSaving(true);
		setSaveError("");

		try {
			const response = await fetch("/api/pricing-estimate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					totalPrice: calculateTotal(selections),
					selections,
					breakdown: formatSelectionsSummary(selections),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save estimate");
			}

			window.open(
				`${CAL_LINKS.ale}?email=${encodeURIComponent(email)}`,
				"_blank"
			);
		} catch (error) {
			console.error("Error saving estimate:", error);
			setSaveError("Failed to save. Please try again.");
		} finally {
			setIsSaving(false);
		}
	};

	const currentTotal = calculateStepTotal(currentStep, selections);
	const grandTotal = calculateTotal(selections);
	const breakdown = getSelectedOptionsByStep(selections);

	// Get translated option name/description by step index and option id
	const getOptionName = (stepIdx: number, optionId: string): string => {
		const stepKey = String(stepIdx) as keyof typeof t;
		try {
			return t(`steps.${stepIdx}.options.${optionId}.name` as Parameters<typeof t>[0]);
		} catch {
			return PRICING_STEPS[stepIdx]?.options.find((o) => o.id === optionId)?.name ?? optionId;
		}
	};

	const getOptionDescription = (stepIdx: number, optionId: string): string => {
		try {
			return t(`steps.${stepIdx}.options.${optionId}.description` as Parameters<typeof t>[0]);
		} catch {
			return PRICING_STEPS[stepIdx]?.options.find((o) => o.id === optionId)?.description ?? "";
		}
	};

	const SummarySidebar = () => {
		if (Object.keys(selections).length === 0) return null;

		return (
			<div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
				<div className="flex items-center gap-2 mb-4">
					<DollarSign className="size-5 text-brand-gold" />
					<h3 className="font-heading text-lg font-bold text-brand-primary">{t("currentEstimate")}</h3>
				</div>

				<div className="space-y-4">
					{breakdown.map((section) => (
						<div
							key={section.stepTitle}
							className="border-b border-border pb-3 last:border-0"
						>
							<div className="flex items-center justify-between mb-2">
								<span className="font-body text-sm font-semibold text-brand-gold">
									{section.stepTitle}
								</span>
								{section.total > 0 && (
									<span className="font-body text-sm text-brand-primary">
										${section.total.toLocaleString()}
									</span>
								)}
							</div>
							<div className="space-y-1">
								{section.options.map((option, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2 font-body text-xs text-brand-primary/50"
									>
										<Check className="size-3 text-green-500 shrink-0" />
										<span className="truncate">{option?.name}</span>
									</div>
								))}
							</div>
						</div>
					))}

					<div className="pt-4 border-t border-brand-gold/30">
						<div className="flex items-center justify-between">
							<span className="font-heading text-lg font-bold text-brand-primary">{t("total")}</span>
							<span className="font-heading text-2xl font-bold text-brand-gold">
								${grandTotal.toLocaleString()}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	if (showSummary) {
		const total = grandTotal;
		const timelineSelection = selections[4]
			? PRICING_STEPS[4].options.find((opt) => opt.id === selections[4][0])
			: null;

		const whyItems = t.raw("whyItems") as { title: string; desc: string }[];
		const whyIcons = [
			<Zap key="zap" className="size-6 text-brand-gold" />,
			<Globe key="globe" className="size-6 text-brand-gold" />,
			<Users key="users" className="size-6 text-brand-gold" />,
			<Shield key="shield" className="size-6 text-brand-gold" />,
		];

		return (
			<div className="min-h-screen">
				<Navbar />

				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
					<motion.div
						initial={{
							opacity: ANIMATION_CONFIG.initialOpacity,
							y: ANIMATION_CONFIG.initialY.medium,
						}}
						animate={{ opacity: ANIMATION_CONFIG.finalOpacity, y: 0 }}
						className="space-y-8"
					>
						{/* Header */}
						<div className="text-center">
							<Check className="size-16 text-green-500 mx-auto mb-4" />
							<h1 className="font-heading text-4xl font-bold text-brand-primary mb-2">
								{t("yourEstimate")}
							</h1>
							<p className="font-body text-brand-primary/50">
								{t("breakdownSubtitle")}
							</p>
						</div>

						{/* Price Display */}
						<div className="bg-brand-gold/10 border border-border-gold rounded-2xl p-8 text-center">
							<p className="font-body text-brand-primary/60 mb-2">{t("totalInvestment")}</p>
							<div className="font-heading text-6xl font-bold text-brand-primary mb-2">
								${total.toLocaleString()}
							</div>
							<p className="font-body text-sm text-brand-primary/40">
								{t("pricingNote")}
							</p>
						</div>

						{/* Email Capture */}
						<div className="bg-surface border border-border rounded-2xl p-8">
							<div className="max-w-2xl min-h-50 mx-auto">
								<h3 className="font-heading text-2xl font-bold text-brand-primary mb-4 text-center">
									{t("getDetailedQuote")}
								</h3>
								<p className="font-body text-brand-primary/60 mb-6 text-center">
									{t("emailDesc")}
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<div className="flex-1">
										<div className="relative">
											<Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-brand-primary/30" />
											<input
												type="email"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
												}}
												onBlur={validateEmail}
												placeholder="your@email.com"
												className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-full font-body text-brand-primary placeholder-brand-primary/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
											/>
										</div>
										{saveError && (
											<div className="flex items-center pt-3 pl-3.5">
												<CircleAlert color="#ff6467" />
												<span className="font-body text-sm mt-1 ml-3 mb-1">
													<p className="underline border-red-400 text-red-400">
														{saveError}
													</p>
												</span>
											</div>
										)}
									</div>
									<Button
										onClick={saveEstimate}
										disabled={isSaving || !isValidEmail}
										variant="gold"
										size="lg"
										loading={isSaving}
									>
										{isSaving ? t("saving") : t("bookConsultation")}
									</Button>
								</div>
							</div>
						</div>

						{/* Breakdown by Section */}
						<div className="bg-surface border border-border rounded-2xl p-8">
							<h2 className="font-heading text-2xl font-bold text-brand-primary mb-6">
								{t("costBreakdown")}
							</h2>
							<div className="space-y-6">
								{breakdown.map((section) => (
									<div
										key={section.stepTitle}
										className="border-b border-border pb-6 last:border-0"
									>
										<div className="flex items-center justify-between mb-4">
											<h3 className="font-heading text-xl font-bold text-brand-gold">
												{section.stepTitle}
											</h3>
											{section.total > 0 && (
												<span className="font-heading text-lg font-semibold text-brand-primary">
													${section.total.toLocaleString()}
												</span>
											)}
										</div>
										<div className="space-y-3">
											{section.options.map((option, idx) => (
												<div
													key={`${section.stepTitle}-${idx}`}
													className="flex items-start justify-between bg-surface rounded-lg p-4"
												>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<Check className="size-4 text-green-500 shrink-0" />
															<span className="font-body text-brand-primary font-medium">
																{option?.name}
															</span>
														</div>
														<p className="font-body text-sm text-brand-primary/50 ml-6">
															{option?.description}
														</p>
													</div>
													{option && option.price > 0 && (
														<span className="font-body text-brand-gold font-semibold ml-4 shrink-0">
															+${option.price.toLocaleString()}
														</span>
													)}
												</div>
											))}
										</div>
									</div>
								))}
							</div>

							{timelineSelection && timelineSelection.id !== "standard" && (
								<div className="mt-6 p-4 bg-brand-gold/10 border border-border-gold rounded-lg">
									<div className="flex items-center gap-2 text-brand-gold">
										<Info className="size-5" />
										<p className="font-body font-semibold">
											{timelineSelection.id === "rush"
												? t("rushFee")
												: t("flexibleDiscount")}
										</p>
									</div>
									<p className="font-body text-sm text-brand-primary/50 mt-1 ml-7">
										{timelineSelection.description}
									</p>
								</div>
							)}
						</div>

						{/* Why Choose Us */}
						<div className="bg-brand-gold/10 border border-border-gold rounded-2xl p-8">
							<h3 className="font-heading text-2xl font-bold text-brand-primary mb-6">
								{t("whyWorkWithUs")}
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{whyItems.map((item, i) => (
									<div key={item.title} className="flex items-start gap-4">
										<div className="p-3 bg-brand-gold/20 rounded-lg shrink-0">
											{whyIcons[i]}
										</div>
										<div>
											<h4 className="font-heading text-brand-primary font-semibold mb-1">
												{item.title}
											</h4>
											<p className="font-body text-sm text-brand-primary/50">
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<Button onClick={resetCalculator} variant="ghost">
								{t("startOver")}
							</Button>
						</div>

						<p className="font-body text-center text-sm text-brand-primary/30">
							{t("disclaimer")}
						</p>
					</motion.div>
				</div>

				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Navbar />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
				{/* Header */}
				<motion.div
					initial={{
						opacity: ANIMATION_CONFIG.initialOpacity,
						y: ANIMATION_CONFIG.initialY.medium,
					}}
					animate={{ opacity: ANIMATION_CONFIG.finalOpacity, y: 0 }}
					className="text-center mb-12"
				>
					<Calculator className="size-16 text-brand-gold mx-auto mb-4" />
					<h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
						{t("calculatorHeading1")}{" "}
						<span className="text-brand-gold">{t("calculatorHeading2")}</span>
					</h1>
					<p className="font-body text-xl text-brand-primary/50 max-w-2xl mx-auto">
						{t("calculatorSubtitle")}
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex justify-between items-center mb-2">
								<span className="font-body text-sm text-brand-primary/50">
									{t("step", { current: currentStep + 1, total: PRICING_STEPS.length })}
								</span>
								<span className="font-body text-sm text-brand-gold">
									{Math.round(((currentStep + 1) / PRICING_STEPS.length) * 100)}%
								</span>
							</div>
							<div className="h-2 bg-surface rounded-full overflow-hidden">
								<motion.div
									initial={{ width: ANIMATION_CONFIG.initialWidth }}
									animate={{
										width: `${((currentStep + 1) / PRICING_STEPS.length) * 100}%`,
									}}
									transition={{ duration: ANIMATION_CONFIG.duration.fast }}
									className="h-full bg-brand-gold"
								/>
							</div>
						</div>

						{/* Current Step Cost */}
						{currentTotal > 0 && (
							<motion.div
								initial={{
									opacity: ANIMATION_CONFIG.initialOpacity,
									scale: ANIMATION_CONFIG.initialScale,
								}}
								animate={{
									opacity: ANIMATION_CONFIG.finalOpacity,
									scale: ANIMATION_CONFIG.finalScale,
								}}
								className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<DollarSign className="size-5 text-green-400" />
										<span className="font-body text-brand-primary/60">{t("currentStepTotal")}</span>
									</div>
									<span className="font-heading text-2xl font-bold text-green-400">
										+${currentTotal.toLocaleString()}
									</span>
								</div>
							</motion.div>
						)}

						{/* Step Content */}
						<AnimatePresence mode="wait">
							<motion.div
								key={currentStep}
								initial={{
									opacity: ANIMATION_CONFIG.initialOpacity,
									x: ANIMATION_CONFIG.initialY.medium,
								}}
								animate={{
									opacity: ANIMATION_CONFIG.finalOpacity,
									x: 0,
								}}
								exit={{
									opacity: ANIMATION_CONFIG.initialOpacity,
									x: -ANIMATION_CONFIG.initialY.medium,
								}}
								transition={{ duration: ANIMATION_CONFIG.duration.fast }}
								className="bg-surface border border-border rounded-2xl p-8 mb-8"
							>
								<h2 className="font-heading text-3xl font-bold text-brand-primary mb-2">
									{t(`steps.${currentStep}.title` as Parameters<typeof t>[0])}
								</h2>
								<p className="font-body text-brand-primary/50 mb-8">
									{t(`steps.${currentStep}.description` as Parameters<typeof t>[0])}
								</p>

								<div className="grid grid-cols-1 gap-4">
									{currentStepData.options.map((option) => (
										<div key={option.id} className="relative group">
											<button
												type="button"
												onClick={() => handleSelection(option.id)}
												onMouseEnter={() => setHoveredOption(option.id)}
												onMouseLeave={() => setHoveredOption(null)}
												className={`w-full relative p-6 text-left rounded-xl border-2 transition-all duration-300 ${
													isSelected(option.id)
														? "border-brand-gold bg-brand-gold/10"
														: "border-border bg-surface hover:border-border-gold hover:bg-surface-hover"
												}`}
											>
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<h3 className="font-heading text-lg font-semibold text-brand-primary">
																{t(`steps.${currentStep}.options.${option.id}.name` as Parameters<typeof t>[0])}
															</h3>
															<Info className="size-4 text-brand-primary/30" />
														</div>
														{option.basePrice > 0 && (
															<p className="font-body text-brand-gold font-semibold mt-2">
																+${option.basePrice.toLocaleString()}
															</p>
														)}
													</div>
													{isSelected(option.id) && (
														<Check className="size-6 text-brand-gold shrink-0" />
													)}
												</div>
											</button>

											{hoveredOption === option.id && (
												<motion.div
													initial={{
														opacity: ANIMATION_CONFIG.initialOpacity,
														y: ANIMATION_CONFIG.initialY.small,
													}}
													animate={{
														opacity: ANIMATION_CONFIG.finalOpacity,
														y: 0,
													}}
													exit={{
														opacity: ANIMATION_CONFIG.initialOpacity,
														y: ANIMATION_CONFIG.initialY.small,
													}}
													className="absolute z-10 left-0 right-0 -bottom-2 translate-y-full p-4 bg-brand-bg border border-border-gold rounded-xl shadow-xl"
												>
													<p className="font-body text-sm text-brand-primary/70">
														{t(`steps.${currentStep}.options.${option.id}.description` as Parameters<typeof t>[0])}
													</p>
												</motion.div>
											)}
										</div>
									))}
								</div>

								{isMultiSelect && (
									<p className="font-body text-sm text-brand-primary/30 mt-4 text-center">
										{t("multiSelectHint")}
									</p>
								)}
							</motion.div>
						</AnimatePresence>

						{/* Navigation Buttons */}
						<div className="flex justify-between items-center">
							<Button
								onClick={prevStep}
								disabled={currentStep === 0}
								variant="ghost"
							>
								<ArrowLeft className="size-5" />
								{t("previous")}
							</Button>

							<Button
								onClick={nextStep}
								disabled={!canProceed()}
								variant={canProceed() ? "gold" : "ghost"}
							>
								{currentStep === PRICING_STEPS.length - 1 ? t("seeEstimate") : t("next")}
								<ArrowRight className="size-5" />
							</Button>
						</div>
					</div>

					{/* Sidebar Summary */}
					<div className="lg:col-span-1">
						<SummarySidebar />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
