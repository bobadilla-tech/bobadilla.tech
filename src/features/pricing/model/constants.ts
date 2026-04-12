import type { Step } from "./types";

export const PRICING_STEPS: Step[] = [
	{
		id: 1,
		title: "Project Type",
		description: "What type of project do you need?",
		options: [
			{
				id: "landing",
				name: "Landing Page",
				basePrice: 350,
				description:
					"Single page website perfect for product launches, events, or simple business presence",
			},
			{
				id: "website",
				name: "Multi-page Website",
				basePrice: 800,
				description:
					"3-10 pages with navigation, perfect for businesses needing multiple content sections",
			},
			{
				id: "webapp",
				name: "Web Application",
				basePrice: 2500,
				description:
					"Interactive web app with user accounts, dashboards, and business logic",
			},
			{
				id: "mobile",
				name: "Mobile App",
				basePrice: 3500,
				description: "Native or cross-platform mobile app for iOS and Android",
			},
			{
				id: "fullstack",
				name: "Full-stack Platform",
				basePrice: 5000,
				description:
					"Complete platform with web, mobile, admin panel, and backend infrastructure",
			},
		],
	},
	{
		id: 2,
		title: "Core Features",
		description: "Select the features you need (select all that apply)",
		multiSelect: true,
		options: [
			{
				id: "auth",
				name: "User Authentication",
				basePrice: 500,
				description:
					"Secure login/signup system with email verification, password reset, and session management",
			},
			{
				id: "payment",
				name: "Payment Integration",
				basePrice: 800,
				description:
					"Stripe, PayPal, or other payment gateway integration with checkout flow",
			},
			{
				id: "admin",
				name: "Admin Dashboard",
				basePrice: 1200,
				description:
					"Backend admin panel for managing users, content, and system settings",
			},
			{
				id: "api",
				name: "REST API",
				basePrice: 600,
				description: "RESTful API for mobile apps or third-party integrations",
			},
			{
				id: "realtime",
				name: "Real-time Features",
				basePrice: 1000,
				description:
					"Live updates, chat, notifications using WebSockets or Firebase",
			},
			{
				id: "notifications",
				name: "Push Notifications",
				basePrice: 400,
				description:
					"Email and/or mobile push notifications for user engagement",
			},
		],
	},
	{
		id: 3,
		title: "Integrations",
		description: "Third-party integrations needed",
		multiSelect: true,
		options: [
			{
				id: "crm",
				name: "CRM Integration",
				basePrice: 600,
				description:
					"Connect to Salesforce, HubSpot, or other CRM for lead management",
			},
			{
				id: "analytics",
				name: "Analytics (GA, Mixpanel)",
				basePrice: 300,
				description:
					"User behavior tracking and analytics dashboard integration",
			},
			{
				id: "email",
				name: "Email Service (SendGrid, Mailgun)",
				basePrice: 400,
				description:
					"Automated email sending for transactional and marketing emails",
			},
			{
				id: "storage",
				name: "Cloud Storage (AWS S3)",
				basePrice: 500,
				description:
					"File upload and storage for user documents, images, or videos",
			},
			{
				id: "social",
				name: "Social Media Login",
				basePrice: 350,
				description:
					"Login with Google, Facebook, LinkedIn, or other social providers",
			},
		],
	},
	{
		id: 4,
		title: "Design & UI",
		description: "Design complexity level",
		options: [
			{
				id: "basic",
				name: "Basic UI (Template-based)",
				basePrice: 0,
				description:
					"Clean, professional design using pre-built components and templates",
			},
			{
				id: "custom",
				name: "Custom Design",
				basePrice: 800,
				description:
					"Unique design tailored to your brand with custom components",
			},
			{
				id: "premium",
				name: "Premium Design with Animations",
				basePrice: 1500,
				description:
					"High-end design with micro-interactions, animations, and advanced UX",
			},
		],
	},
	{
		id: 5,
		title: "Timeline",
		description: "When do you need it delivered?",
		options: [
			{
				id: "rush",
				name: "Rush (1-2 weeks) +30%",
				basePrice: 0,
				description:
					"Express delivery with priority development and extended team hours",
			},
			{
				id: "standard",
				name: "Standard (3-4 weeks)",
				basePrice: 0,
				description:
					"Standard timeline with balanced development pace and quality assurance",
			},
			{
				id: "flexible",
				name: "Flexible (5+ weeks) -15%",
				basePrice: 0,
				description: "Budget-friendly option with flexible delivery schedule",
			},
		],
	},
];

export const TIMELINE_STEP_ID = 5;
export const RUSH_MULTIPLIER = 1.3;
export const FLEXIBLE_MULTIPLIER = 0.85;
export const STANDARD_MULTIPLIER = 1;

// Animation configuration constants
export const ANIMATION_CONFIG = {
	duration: {
		fast: 0.3,
		normal: 0.5,
	},
	staggerDelay: 0.1,
	initialY: {
		small: 10,
		medium: 20,
	},
	initialOpacity: 0,
	finalOpacity: 1,
	initialScale: 0.95,
	finalScale: 1,
	initialWidth: 0,
	hoverScale: 1.05,
} as const;
