"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";

export default function ServiceReasons() {
	const t = useTranslations("ServiceReasons");

	const reasons = [
		{ title: t("reasons.0") },
		{ title: t("reasons.1") },
		{ title: t("reasons.2") },
		{ title: t("reasons.3") },
		{ title: t("reasons.4") },
	];

	return (
		<section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="font-heading font-bold text-5xl sm:text-6xl text-center mb-4 tracking-tight"
				>
					<span className="text-brand-primary">{t("heading1")}</span>
					<br />
					<span className="text-brand-gold">{t("heading2")}</span>
				</motion.h2>

				<div className="mt-16">
					<Carousel opts={{ align: "start", loop: false }} className="w-full">
						<CarouselContent className="-ml-6">
							{/* Regular reason cards */}
							{reasons.slice(0, 2).map((reason, i) => (
								<CarouselItem
									key={reason.title}
									className="pl-6 basis-[280px] shrink-0"
								>
									<motion.div
										initial={{ opacity: 0, x: 30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1 }}
										className="bg-white rounded-[55px] p-8 h-[358px] flex flex-col justify-end relative overflow-hidden"
									>
										<div className="absolute top-10 left-12 w-24 h-24">
											<Image
												src="/assets/services/shared/ellipse-gold.svg"
												alt=""
												width={96}
												height={96}
												unoptimized
											/>
											<Image
												src="/assets/services/shared/computer.svg"
												alt=""
												width={64}
												height={64}
												className="absolute inset-0 m-auto w-16 h-16 object-contain"
												unoptimized
											/>
										</div>
										<h3 className="font-heading text-black font-medium text-3xl tracking-tight whitespace-pre-line leading-tight">
											{reason.title}
										</h3>
									</motion.div>
								</CarouselItem>
							))}

							{/* Featured center card */}
							<CarouselItem className="pl-6 basis-[400px] shrink-0">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									className="bg-white rounded-[70px] h-[457px] flex flex-col justify-end p-12 relative overflow-hidden"
									style={{
										boxShadow:
											"0 0 110px 0 #a6993f, 0 0 63px 0 #a6993f, 0 0 37px 0 #a6993f",
									}}
								>
									<div className="absolute top-10 left-16 w-32 h-32">
										<Image
											src="/assets/services/shared/ellipse-circle.svg"
											alt=""
											width={128}
											height={128}
											unoptimized
										/>
										<Image
											src="/assets/services/shared/computer-lg.svg"
											alt=""
											width={80}
											height={80}
											className="absolute inset-0 m-auto w-20 h-20 object-contain"
											unoptimized
										/>
									</div>
									<div className="absolute top-10 right-10 w-14 h-14">
										<Image
											src="/assets/services/shared/ellipse-dot.svg"
											alt=""
											width={56}
											height={56}
											unoptimized
										/>
									</div>
									<h3 className="font-heading text-black font-medium text-5xl tracking-tight leading-tight mb-4">
										{t("featuredTitle")}
									</h3>
									<p className="font-body text-black font-light text-3xl tracking-tight whitespace-pre-line leading-tight">
										{t("featuredBody")}
									</p>
								</motion.div>
							</CarouselItem>

							{/* Remaining reason cards */}
							{reasons.slice(2).map((reason, i) => (
								<CarouselItem
									key={reason.title}
									className="pl-6 basis-[280px] shrink-0"
								>
									<motion.div
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.1 }}
										className="bg-white rounded-[55px] p-8 h-[358px] flex flex-col justify-end relative overflow-hidden"
									>
										<div className="absolute top-10 left-12 w-24 h-24">
											<Image
												src="/assets/services/shared/ellipse-gold.svg"
												alt=""
												width={96}
												height={96}
												unoptimized
											/>
											<Image
												src="/assets/services/shared/computer.svg"
												alt=""
												width={64}
												height={64}
												className="absolute inset-0 m-auto w-16 h-16 object-contain"
												unoptimized
											/>
										</div>
										<h3 className="font-heading text-black font-medium text-3xl tracking-tight whitespace-pre-line leading-tight">
											{reason.title}
										</h3>
									</motion.div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-4" />
						<CarouselNext className="-right-4" />
					</Carousel>
				</div>
			</div>
		</section>
	);
}
