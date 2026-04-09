import type { ServicePageData, ProcessStep } from "./service-pages.shared";
import { sharedTechStack } from "./service-pages.shared";

const sharedProcessSteps: ProcessStep[] = [
	{
		title: "Project Definition",
		description: "Understanding your goals, users, and success metrics",
	},
	{
		title: "Research & Analysis",
		description:
			"Competitive analysis, user research, and technical feasibility",
	},
	{
		title: "Tech Stack & Architecture",
		description:
			"Selecting the right technologies for scalability and performance",
	},
	{
		title: "Design & User Experience",
		description: "Wireframes, prototypes, and visual design that converts",
	},
	{
		title: "Development & QA",
		description: "Agile development with continuous testing and feedback",
	},
	{
		title: "Launch & Growth",
		description: "Deployment, monitoring, and ongoing optimization",
	},
];

const sharedFaq = [
	{
		q: "How fast can you deliver a project?",
		a: "Depending on complexity, MVPs can be delivered in 2–4 weeks, full products in 6–12 weeks. We commit to clear timelines upfront.",
	},
	{
		q: "What happens if deadlines aren't met?",
		a: "We guarantee our delivery commitments. If we miss a deadline, we work overtime at no extra cost until it's done.",
	},
	{
		q: "Do you work with startups?",
		a: "Absolutely — we've worked with early-stage startups through to enterprise teams. We adapt our process to your stage and budget.",
	},
	{
		q: "Do you offer support after launch?",
		a: "Yes. We offer ongoing maintenance, monitoring, and growth packages so your product keeps improving after launch.",
	},
];

export const servicePages: ServicePageData[] = [
	// ─── WEB DEV ────────────────────────────────────────────────────────────
	{
		slug: "web-development",
		eyebrow: "WEB DEVELOPMENT SERVICES",
		heroLine1: "BUILT WEB SOLUTIONS THAT",
		heroLine2: "DRIVE REAL BUSINESS RESULTS",
		heroSubtitle:
			"We develop modern websites, applications, and platforms optimized for speed, user engagement, and sustainable growth.",
		urgencyBandText: "Stop wasting time and money. Let's build it right.",
		urgencyBandCta: "START YOUR PROJECT",
		painPointsHeading: "3 COSTLY MISTAKES IN WEB DEVELOPMENT",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Months of work, nothing to show",
				description:
					"Building features nobody needs while missing your market window.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Unstable development teams",
				description:
					"Freelancers vanish, agencies turn over, and your project knowledge disappears.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Code that can't grow with you",
				description: "Shortcuts today become expensive rewrites tomorrow.",
			},
		],
		servicesHeading: "DEVELOPMENT SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "Custom web applications",
				description:
					"Powerful web apps built from scratch aligned with your workflows, user needs, and business goals.",
			},
			{
				title: "Web solutions for e-commerce",
				description:
					"Scalable online stores with seamless UX, smart integrations, and features built for growth.",
			},
			{
				title: "Access-controlled web portals",
				description:
					"Secure portals with role-based access, custom dashboards, and streamlined user workflows.",
			},
			{
				title: "Corporate & marketing websites",
				description:
					"High-impact websites with responsive design and compelling interfaces that drive conversions.",
			},
			{
				title: "Headless & CMS-based websites",
				description:
					"Modern, content-driven sites with flexible CMS platforms for easy management and control.",
			},
			{
				title: "Platform modernization & migration",
				description:
					"Transform legacy systems into modern platforms — faster, more secure, and easier to maintain.",
			},
		],
		processHeading: "OUR DEVELOPMENT PROCESS",
		processSubtitle:
			"From first conversation to final deployment, we combine technical expertise with business thinking.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── CMS ────────────────────────────────────────────────────────────────
	{
		slug: "cms-development",
		eyebrow: "CMS DEVELOPMENT SERVICES",
		heroLine1: "POWERING YOUR",
		heroLine2: "DIGITAL GROWTH",
		heroSubtitle:
			"We create tailored digital solutions that not only look great but also drive real results and support your business as it grows.",
		painPointsHeading: "WHY US?",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Great performance",
				description:
					"Headless CMS architecture delivers blazing-fast page loads and seamless user experiences.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Total flexibility",
				description:
					"Edit content easily while developers work independently on features and integrations.",
			},
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Enterprise security",
				description:
					"Role-based permissions, audit logs, and secure API endpoints protect your content and users.",
			},
		],
		servicesHeading: "CMS DEVELOPMENT SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "Headless CMS architecture",
				description:
					"Decouple your frontend from content management for ultimate flexibility and speed.",
			},
			{
				title: "Sanity & Strapi setup",
				description:
					"Configure and extend leading open-source CMS platforms tailored to your content model.",
			},
			{
				title: "Shopify & BigCommerce",
				description:
					"Full e-commerce builds with custom themes, apps, and integrations that scale.",
			},
			{
				title: "Content migrations",
				description:
					"Safely migrate content from legacy systems without data loss or SEO impact.",
			},
			{
				title: "CMS API integrations",
				description:
					"Connect your CMS to third-party services — analytics, email, payment gateways, and more.",
			},
			{
				title: "Editor experience design",
				description:
					"Build intuitive editing interfaces so your team can publish without developer help.",
			},
		],
		processHeading: "OUR PROJECT WORKFLOW",
		processSubtitle:
			"From first conversation to final deployment, we combine technical expertise with business thinking to build solutions that drive real results.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB APPLICATION ────────────────────────────────────────────────────
	{
		slug: "web-application-development",
		eyebrow: "WEB APPLICATION DEVELOPMENT",
		heroLine1: "APPLICATIONS BUILT FOR",
		heroLine2: "SCALE AND PERFORMANCE",
		heroSubtitle:
			"Custom web applications designed around your workflows — fast, secure, and ready to grow with your business.",
		painPointsHeading: "COMMON WEB APP PITFALLS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Poor scalability from day one",
				description:
					"Apps built without growth in mind collapse under real user loads.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Disconnected teams",
				description:
					"Frontend and backend silos lead to integration bugs and slow delivery.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Feature creep kills timelines",
				description:
					"Scope grows unchecked and products ship months late with the wrong features.",
			},
		],
		servicesHeading: "WEB APP SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "SaaS product development",
				description:
					"Full-stack SaaS applications with auth, billing, multi-tenancy, and admin dashboards.",
			},
			{
				title: "Internal tools & dashboards",
				description:
					"Custom back-office tools that replace spreadsheets and generic software.",
			},
			{
				title: "Real-time applications",
				description:
					"WebSocket-powered apps for live collaboration, notifications, and streaming data.",
			},
			{
				title: "API-first architecture",
				description:
					"RESTful and GraphQL APIs built for longevity and easy integration.",
			},
			{
				title: "Progressive web apps",
				description:
					"Installable, offline-capable apps with native-like performance on any device.",
			},
			{
				title: "Legacy modernization",
				description:
					"Refactor and re-architect aging web apps into maintainable, scalable systems.",
			},
		],
		processHeading: "OUR DEVELOPMENT PROCESS",
		processSubtitle:
			"Structured delivery from discovery to launch, with no surprises along the way.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB PORTAL ─────────────────────────────────────────────────────────
	{
		slug: "web-portal-development",
		eyebrow: "WEB PORTAL DEVELOPMENT",
		heroLine1: "PORTALS THAT CONNECT",
		heroLine2: "PEOPLE AND PROCESSES",
		heroSubtitle:
			"Client portals, vendor portals, and employee intranets — built with secure access control and seamless user workflows.",
		painPointsHeading: "PORTAL CHALLENGES WE SOLVE",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Fragile access control",
				description:
					"Wrong permissions expose sensitive data or lock out the users who need it.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Poor data visibility",
				description:
					"Users can't find what they need — leading to support tickets and inefficiency.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Disconnected systems",
				description:
					"Siloed tools mean manual data entry and no single source of truth.",
			},
		],
		servicesHeading: "PORTAL SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "Client portals",
				description:
					"Branded portals for customers to track orders, invoices, and support tickets in one place.",
			},
			{
				title: "Vendor & partner portals",
				description:
					"Streamline supplier relationships with onboarding, document management, and reporting.",
			},
			{
				title: "Employee intranets",
				description:
					"Internal portals for HR, policies, announcements, and team collaboration.",
			},
			{
				title: "Role-based access control",
				description:
					"Granular permission systems that ensure users only see what they're authorized to access.",
			},
			{
				title: "Custom dashboards",
				description:
					"Data-rich views tailored to each user role — from executives to field workers.",
			},
			{
				title: "Third-party integrations",
				description:
					"Connect portals to ERP, CRM, accounting, and communication platforms.",
			},
		],
		processHeading: "OUR DEVELOPMENT PROCESS",
		processSubtitle:
			"Discovery-first approach to understand your users before writing a single line of code.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── FRONTEND ───────────────────────────────────────────────────────────
	{
		slug: "front-end-development",
		eyebrow: "FRONTEND DEVELOPMENT",
		heroLine1: "INTERFACES USERS",
		heroLine2: "LOVE TO USE",
		heroSubtitle:
			"Pixel-perfect, performant frontends built with React and Next.js — designed to convert and engineered to last.",
		painPointsHeading: "FRONTEND PROBLEMS WE FIX",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Slow page load times",
				description:
					"Every 100ms of delay costs conversion rate. We build for Core Web Vitals from the start.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Inconsistent UI across platforms",
				description:
					"Pixel drift between design and code erodes trust and brand consistency.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Unmaintainable component libraries",
				description:
					"Spaghetti component code slows down every new feature and makes refactors painful.",
			},
		],
		servicesHeading: "FRONTEND SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "React & Next.js applications",
				description:
					"Modern, server-rendered or static React apps optimized for SEO and performance.",
			},
			{
				title: "Design system implementation",
				description:
					"Convert Figma designs into robust component libraries with full documentation.",
			},
			{
				title: "Performance optimization",
				description:
					"Bundle analysis, lazy loading, and caching strategies to hit green Core Web Vitals.",
			},
			{
				title: "Responsive & adaptive UI",
				description:
					"Interfaces that work beautifully across every breakpoint and device.",
			},
			{
				title: "Accessibility (WCAG)",
				description:
					"AA-compliant frontends that work for every user, with or without assistive technology.",
			},
			{
				title: "Frontend architecture",
				description:
					"Scalable monorepos, state management, and data-fetching patterns for large teams.",
			},
		],
		processHeading: "OUR FRONTEND PROCESS",
		processSubtitle:
			"Design-to-code workflows that eliminate back-and-forth and deliver pixel-perfect results.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── BACKEND ────────────────────────────────────────────────────────────
	{
		slug: "back-end-development",
		eyebrow: "BACKEND DEVELOPMENT",
		heroLine1: "BACKENDS BUILT FOR",
		heroLine2: "RELIABILITY AND SCALE",
		heroSubtitle:
			"From REST APIs to event-driven microservices — we architect backend systems that handle real production load.",
		painPointsHeading: "BACKEND RISKS WE ELIMINATE",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Security vulnerabilities at the core",
				description:
					"Insecure APIs, unvalidated inputs, and missing auth are the most costly mistakes in production.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Monoliths that can't scale",
				description:
					"Tightly coupled code makes scaling individual services impossible without rewriting everything.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "No observability, no control",
				description:
					"When something breaks in production, teams without logs and tracing fly blind.",
			},
		],
		servicesHeading: "BACKEND SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "REST & GraphQL APIs",
				description:
					"Well-documented, versioned APIs that integrate cleanly with any frontend or third-party.",
			},
			{
				title: "Microservices architecture",
				description:
					"Independent, deployable services connected via message queues and service meshes.",
			},
			{
				title: "Authentication & authorization",
				description:
					"JWT, OAuth2, RBAC — secure auth flows for every use case.",
			},
			{
				title: "Database design & optimization",
				description:
					"Schema design, indexing strategies, and query optimization for high-traffic systems.",
			},
			{
				title: "Background jobs & queues",
				description:
					"Reliable task processing with RabbitMQ, Bull, or SQS — no dropped jobs.",
			},
			{
				title: "Cloud infrastructure (AWS)",
				description:
					"Serverless functions, containers, and managed services deployed with infrastructure-as-code.",
			},
		],
		processHeading: "OUR BACKEND PROCESS",
		processSubtitle:
			"Architecture-first approach that prevents expensive rewrites and unplanned downtime.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MOBILE ─────────────────────────────────────────────────────────────
	{
		slug: "mobile-app-development",
		eyebrow: "MOBILE DEVELOPMENT",
		heroLine1: "APPS PEOPLE",
		heroLine2: "CAN'T PUT DOWN",
		heroSubtitle:
			"Cross-platform mobile apps for iOS and Android — built with React Native and tested on real devices.",
		painPointsHeading: "MOBILE PITFALLS TO AVOID",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Slow time-to-market",
				description:
					"Separate native iOS/Android codebases double your development time and budget.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Poor app store rejection rates",
				description:
					"Apps rejected at review waste weeks and kill launch momentum.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Janky performance on device",
				description:
					"Apps that lag, crash, or drain battery get uninstalled within the first session.",
			},
		],
		servicesHeading: "MOBILE SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "React Native apps",
				description:
					"Single codebase for iOS and Android — 90% code sharing with native performance.",
			},
			{
				title: "App Store & Google Play launch",
				description:
					"We handle app store submission, metadata, screenshots, and review compliance.",
			},
			{
				title: "Push notifications & deep links",
				description:
					"Engagement-driving features that bring users back at the right moment.",
			},
			{
				title: "Offline-first architecture",
				description:
					"Apps that work without internet and sync seamlessly when connectivity returns.",
			},
			{
				title: "API integration & real-time sync",
				description:
					"Connect your app to any backend with reliable data fetching and live updates.",
			},
			{
				title: "App performance optimization",
				description:
					"Profile and fix rendering bottlenecks, memory leaks, and startup time issues.",
			},
		],
		processHeading: "OUR MOBILE PROCESS",
		processSubtitle:
			"From wireframe to app store in weeks, not months — with real device testing at every stage.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MVP ────────────────────────────────────────────────────────────────
	{
		slug: "mvp-development",
		eyebrow: "MVP DEVELOPMENT",
		heroLine1: "FROM CONCEPT TO LAUNCH —",
		heroLine2: "WE TURN IDEAS INTO WHAT'S NEXT",
		heroSubtitle:
			"We design, build, and launch scalable MVPs — helping you validate faster and grow smarter.",
		featureBadges: [
			{ text: "Full-cycle development by a high-performance team", icon: "zap" },
			{ text: "Fast delivery with predictable timelines", icon: "timer" },
		],
		painPointsHeading: "MVP PITBALLS THAT DRAIN TIME AND BUDGET",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Stop wasting months on your MVP",
				description: "Launch faster by focusing only on what truly matters.",
				stat: "2x",
				statLabel: "faster launch speed",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Don't build blindly",
				description:
					"Validate your idea before investing heavily in development.",
				stat: "0%",
				statLabel: "uncertainty in your product",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "More features ≠ better product",
				description: "We help you build lean, test fast, and scale smart.",
				stat: "40%",
				statLabel: "less waste in development",
			},
		],
		solutionsHeading: "MVP SOLUTIONS BUILT AROUND YOUR PROJECT",
		mvpSolutions: [
			{
				title: "Clickable prototype",
				description:
					"Interactive prototypes to validate your idea before development.",
				icon: "prototype",
			},
			{
				title: "Functional MVP",
				description:
					"A fully working product built to launch and test in real conditions.",
				icon: "functional",
			},
			{
				title: "MVP refinement",
				description:
					"Improve, scale, and refine your product based on real user feedback.",
				icon: "refinement",
			},
		],
		forWhoHeading: "WHO OUR MVP SOLUTIONS ARE FOR",
		forWho: [
			{
				tag: "GOT AN IDEA TO VALIDATE?",
				title: "Founders building their first product",
				description:
					"Turn your idea into a real product fast and validate it with real users from day one.",
			},
			{
				tag: "TESTING A NEW OPPORTUNITY?",
				title: "Teams exploring new product directions",
				description:
					"Validate new features or markets without slowing down your core roadmap.",
			},
			{
				tag: "NEED TO LAUNCH SOMETHING NEW?",
				title: "Companies launching digital products",
				description:
					"We help you go from concept to launch with speed, clarity, and scalability.",
			},
		],
		servicesHeading: "MVP SERVICES WE OFFER",
		servicesOffered: [
			{
				title: "Scope definition workshop",
				description:
					"We help you identify the single core feature that validates your hypothesis — nothing more.",
			},
			{
				title: "2–4 week sprint delivery",
				description:
					"Working software in your hands fast, so you can start collecting real user feedback.",
			},
			{
				title: "Landing page + waitlist",
				description:
					"Validate demand before building with a high-converting landing page and email capture.",
			},
			{
				title: "User authentication & onboarding",
				description:
					"Solid auth, onboarding flows, and user management from day one.",
			},
			{
				title: "Analytics & feedback loops",
				description:
					"Mixpanel, PostHog, or custom tracking so you know what users actually do.",
			},
			{
				title: "MVP → V2 roadmap",
				description:
					"After launch, we help you prioritize the features that matter based on real data.",
			},
		],
		processHeading: "FROM IDEA TO LAUNCH",
		processSubtitle:
			"Four focused steps to get from idea to live product with no wasted motion.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},
];
