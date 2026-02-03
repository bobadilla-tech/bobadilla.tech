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
import ShaderBackground from "@/components/shaders/ShaderBackgroundLazy";
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
		if (!email || isValidEmail) {
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

			// Redirect to booking with email pre-filled
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

	// Summary Sidebar Component
	const SummarySidebar = () => {
		if (Object.keys(selections).length === 0) return null;

		return (
			<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
				<div className="flex items-center gap-2 mb-4">
					<DollarSign className="w-5 h-5 text-cyan-400" />
					<h3 className="text-lg font-bold text-white">Current Estimate</h3>
				</div>

				<div className="space-y-4">
					{breakdown.map((section) => (
						<div
							key={section.stepTitle}
							className="border-b border-white/10 pb-3 last:border-0"
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-semibold text-cyan-400">
									{section.stepTitle}
								</span>
								{section.total > 0 && (
									<span className="text-sm text-white">
										${section.total.toLocaleString()}
									</span>
								)}
							</div>
							<div className="space-y-1">
								{section.options.map((option, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2 text-xs text-gray-400"
									>
										<Check className="w-3 h-3 text-green-500 flex-shrink-0" />
										<span className="truncate">{option?.name}</span>
									</div>
								))}
							</div>
						</div>
					))}

					<div className="pt-4 border-t border-cyan-500/30">
						<div className="flex items-center justify-between">
							<span className="text-lg font-bold text-white">Total</span>
							<span className="text-2xl font-bold text-cyan-400">
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

		return (
			<div className="min-h-screen bg-slate-950">
				<Navbar />
				<ShaderBackground />

				<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
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
							<Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
							<h1 className="text-4xl font-bold text-white mb-2">
								Your Project Estimate
							</h1>
							<p className="text-gray-400">
								Detailed breakdown of your custom solution
							</p>
						</div>

						{/* Price Display */}
						<div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
							<p className="text-gray-300 mb-2">Total Investment</p>
							<div className="text-6xl font-bold text-white mb-2">
								${total.toLocaleString()}
							</div>
							<p className="text-sm text-gray-400">
								Competitive LATAM pricing • Same timezone • Cultural alignment
							</p>
						</div>

						{/* Email Capture */}
						<div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
							<div className="max-w-2xl min-h-50 mx-auto">
								<h3 className="text-2xl font-bold text-white mb-4 text-center">
									Get Your Detailed Quote
								</h3>
								<p className="text-gray-300 mb-6 text-center">
									Enter your email to save this estimate and book a free
									consultation with our team
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<div className="flex-1">
										<div className="relative">
											<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="email"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
												}}
												onBlur={validateEmail}
												placeholder="your@email.com"
												className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
											/>
										</div>
										{saveError && (
											<div className="flex items-center pt-3 pl-3.5">
												<CircleAlert color="#ff6467" />
												<span className="text-sm mt-1 ml-3 mb-1">
													<p className="underline border-red-400 text-red-400 ">
														{saveError}
													</p>
												</span>
											</div>
										)}
									</div>
									<button
										onClick={saveEstimate}
										disabled={isSaving || !isValidEmail}
										className="px-8 py-4 h-14.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isSaving ? "Saving..." : "Book Free Consultation"}
									</button>
								</div>
							</div>
						</div>

						{/* Breakdown by Section */}
						<div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
							<h2 className="text-2xl font-bold text-white mb-6">
								Cost Breakdown
							</h2>
							<div className="space-y-6">
								{breakdown.map((section) => (
									<div
										key={section.stepTitle}
										className="border-b border-white/10 pb-6 last:border-0"
									>
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-xl font-bold text-cyan-400">
												{section.stepTitle}
											</h3>
											{section.total > 0 && (
												<span className="text-lg font-semibold text-white">
													${section.total.toLocaleString()}
												</span>
											)}
										</div>
										<div className="space-y-3">
											{section.options.map((option, idx) => (
												<div
													key={`${section.stepTitle}-${idx}`}
													className="flex items-start justify-between bg-white/5 rounded-lg p-4"
												>
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<Check className="w-4 h-4 text-green-500 flex-shrink-0" />
															<span className="text-white font-medium">
																{option?.name}
															</span>
														</div>
														<p className="text-sm text-gray-400 ml-6">
															{option?.description}
														</p>
													</div>
													{option && option.price > 0 && (
														<span className="text-cyan-400 font-semibold ml-4 flex-shrink-0">
															+${option.price.toLocaleString()}
														</span>
													)}
												</div>
											))}
										</div>
									</div>
								))}
							</div>

							{/* Timeline Multiplier Note */}
							{timelineSelection && timelineSelection.id !== "standard" && (
								<div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
									<div className="flex items-center gap-2 text-purple-300">
										<Info className="w-5 h-5" />
										<p className="font-semibold">
											{timelineSelection.id === "rush"
												? "+30% Rush Fee Applied"
												: "-15% Flexible Timeline Discount Applied"}
										</p>
									</div>
									<p className="text-sm text-gray-400 mt-1 ml-7">
										{timelineSelection.description}
									</p>
								</div>
							)}
						</div>

						{/* Why Choose Us */}
						<div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
							<h3 className="text-2xl font-bold text-white mb-6">
								Why Work With Us?
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-yellow-500/20 rounded-lg">
										<Zap className="w-6 h-6 text-yellow-500" />
									</div>
									<div>
										<h4 className="text-white font-semibold mb-1">
											Highly Responsive
										</h4>
										<p className="text-sm text-gray-400">
											Quick turnaround times and constant communication
											throughout development
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-cyan-500/20 rounded-lg">
										<Globe className="w-6 h-6 text-cyan-500" />
									</div>
									<div>
										<h4 className="text-white font-semibold mb-1">
											Same Timezone
										</h4>
										<p className="text-sm text-gray-400">
											LATAM-based team for seamless real-time collaboration
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-green-500/20 rounded-lg">
										<Users className="w-6 h-6 text-green-500" />
									</div>
									<div>
										<h4 className="text-white font-semibold mb-1">
											Cultural Alignment
										</h4>
										<p className="text-sm text-gray-400">
											Strong work ethic and cultural compatibility with US/EU
											teams
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-500/20 rounded-lg">
										<Shield className="w-6 h-6 text-blue-500" />
									</div>
									<div>
										<h4 className="text-white font-semibold mb-1">
											Offshore Pricing
										</h4>
										<p className="text-sm text-gray-400">
											Premium quality at competitive LATAM rates - save 40-60%
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<button
								onClick={resetCalculator}
								className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
							>
								Start Over
							</button>
						</div>

						<p className="text-center text-sm text-gray-400">
							*Final pricing may vary based on specific requirements and project
							scope
						</p>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950">
			<Navbar />
			<ShaderBackground />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
				{/* Header */}
				<motion.div
					initial={{
						opacity: ANIMATION_CONFIG.initialOpacity,
						y: ANIMATION_CONFIG.initialY.medium,
					}}
					animate={{ opacity: ANIMATION_CONFIG.finalOpacity, y: 0 }}
					className="text-center mb-12"
				>
					<Calculator className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
					<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
						Project Pricing{" "}
						<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
							Calculator
						</span>
					</h1>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Get an instant estimate for your project in just a few steps
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm text-gray-400">
									Step {currentStep + 1} of {PRICING_STEPS.length}
								</span>
								<span className="text-sm text-cyan-400">
									{Math.round(((currentStep + 1) / PRICING_STEPS.length) * 100)}
									%
								</span>
							</div>
							<div className="h-2 bg-white/5 rounded-full overflow-hidden">
								<motion.div
									initial={{ width: ANIMATION_CONFIG.initialWidth }}
									animate={{
										width: `${((currentStep + 1) / PRICING_STEPS.length) * 100}%`,
									}}
									transition={{ duration: ANIMATION_CONFIG.duration.fast }}
									className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
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
								className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<DollarSign className="w-5 h-5 text-green-400" />
										<span className="text-gray-300">Current Step Total:</span>
									</div>
									<span className="text-2xl font-bold text-green-400">
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
								className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
							>
								<h2 className="text-3xl font-bold text-white mb-2">
									{currentStepData.title}
								</h2>
								<p className="text-gray-400 mb-8">
									{currentStepData.description}
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
														? "border-cyan-500 bg-cyan-500/10"
														: "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
												}`}
											>
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-1">
															<h3 className="text-lg font-semibold text-white">
																{option.name}
															</h3>
															<Info className="w-4 h-4 text-gray-500" />
														</div>
														{option.basePrice > 0 && (
															<p className="text-cyan-400 font-semibold mt-2">
																+${option.basePrice.toLocaleString()}
															</p>
														)}
													</div>
													{isSelected(option.id) && (
														<Check className="w-6 h-6 text-cyan-400 flex-shrink-0" />
													)}
												</div>
											</button>

											{/* Tooltip on Hover */}
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
													className="absolute z-10 left-0 right-0 -bottom-2 translate-y-full p-4 bg-slate-800 border border-cyan-500/30 rounded-xl shadow-xl"
												>
													<p className="text-sm text-gray-300">
														{option.description}
													</p>
												</motion.div>
											)}
										</div>
									))}
								</div>

								{isMultiSelect && (
									<p className="text-sm text-gray-500 mt-4 text-center">
										💡 You can select multiple options
									</p>
								)}
							</motion.div>
						</AnimatePresence>

						{/* Navigation Buttons */}
						<div className="flex justify-between items-center">
							<button
								type="button"
								onClick={prevStep}
								disabled={currentStep === 0}
								className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
									currentStep === 0
										? "bg-white/5 text-gray-600 cursor-not-allowed"
										: "bg-white/10 text-white hover:bg-white/20"
								}`}
							>
								<ArrowLeft className="w-5 h-5" />
								Previous
							</button>

							<button
								type="button"
								onClick={nextStep}
								disabled={!canProceed()}
								className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
									canProceed()
										? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
										: "bg-white/5 text-gray-600 cursor-not-allowed"
								}`}
							>
								{currentStep === PRICING_STEPS.length - 1
									? "See Estimate"
									: "Next"}
								<ArrowRight className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Sidebar Summary */}
					<div className="lg:col-span-1">
						<SummarySidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
