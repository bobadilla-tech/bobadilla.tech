export interface Service {
	id: string;
	title: string;
	slug: string;
	description: string;
	image?: string;
	imageAlt?: string;
	icon?: string;
	category?: string;
	titleKey?: string;
	descriptionKey?: string;
}

export interface IndustryService {
	id: string;
	industry: string;
	slug: string;
	description: string;
	services: Service[];
	icon?: string;
	image?: string;
	imageAlt?: string;
}

export const allServices: Service[] = [
	{
		id: "web-app-dev",
		title: "Web Application Development",
		slug: "web-application-development",
		description:
			"Full-featured web applications with robust backend systems and intuitive interfaces.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
		imageAlt: "Web application development",
		titleKey: "cards.webAppDev.title",
		descriptionKey: "cards.webAppDev.description",
	},
	{
		id: "web-portal-dev",
		title: "Web Portal Development",
		slug: "web-portal-development",
		description:
			"Custom web portals for internal tools, customer dashboards, and more.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
		imageAlt: "Web portal development",
		titleKey: "cards.webPortalDev.title",
		descriptionKey: "cards.webPortalDev.description",
	},
	{
		id: "mobile-app-dev",
		title: "Mobile App Development",
		slug: "mobile-app-development",
		description:
			"Native and cross-platform mobile applications for iOS and Android.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
		imageAlt: "Mobile app development",
		titleKey: "cards.mobileAppDev.title",
		descriptionKey: "cards.mobileAppDev.description",
	},
	{
		id: "frontend-dev",
		title: "Front-end Development",
		slug: "front-end-development",
		description: "Modern, responsive, and performant user interfaces.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
		imageAlt: "Front-end development",
		titleKey: "cards.frontendDev.title",
		descriptionKey: "cards.frontendDev.description",
	},
	{
		id: "backend-dev",
		title: "Back-end Development",
		slug: "back-end-development",
		description:
			"Enterprise-grade backend systems built by senior engineering talent.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
		imageAlt: "Back-end development",
		titleKey: "cards.backendDev.title",
		descriptionKey: "cards.backendDev.description",
	},
	{
		id: "web-dev",
		title: "Web Development",
		slug: "web-development",
		description:
			"Custom web applications built with cutting-edge technologies for optimal performance and user experience.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
		imageAlt: "Web development",
		titleKey: "cards.webDev.title",
		descriptionKey: "cards.webDev.description",
	},
	{
		id: "cms-dev",
		title: "CMS Development",
		slug: "cms-development",
		description:
			"Powerful content management systems tailored to your business needs.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
		imageAlt: "CMS development",
		titleKey: "cards.cmsDev.title",
		descriptionKey: "cards.cmsDev.description",
	},
	{
		id: "mvp-dev",
		title: "MVP Development",
		slug: "mvp-development",
		description:
			"Launch your startup in days or weeks, not months. Rapid MVP development to validate your idea.",
		category: "development",
		image:
			"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
		imageAlt: "MVP development",
		titleKey: "cards.mvpDev.title",
		descriptionKey: "cards.mvpDev.description",
	},
];

export const industryServices: IndustryService[] = [
	{
		id: "healthcare",
		industry: "Healthcare",
		slug: "healthcare",
		description:
			"HIPAA-compliant healthcare solutions with enterprise security and scalability.",
		image:
			"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
		imageAlt: "Healthcare technology solutions",
		services: [
			{
				id: "healthcare-software",
				title: "Healthcare Software Development",
				slug: "healthcare-software-development",
				description:
					"Custom healthcare software solutions built with compliance and security in mind.",
			},
			{
				id: "healthcare-it",
				title: "Healthcare IT Consulting",
				slug: "healthcare-it-consulting",
				description:
					"Expert guidance on healthcare technology strategy and implementation.",
			},
			{
				id: "healthcare-app",
				title: "Healthcare App Development",
				slug: "healthcare-app-development",
				description:
					"Mobile and web applications for healthcare providers and patients.",
			},
			{
				id: "healthcare-uiux",
				title: "Healthcare UI/UX Design",
				slug: "healthcare-ui-ux-design",
				description: "User-centered design for healthcare applications.",
			},
			{
				id: "medical-apps-patients",
				title: "Medical Apps for Patients",
				slug: "medical-apps-for-patients",
				description:
					"Patient-facing applications for health tracking and telemedicine.",
			},
			{
				id: "healthcare-testing",
				title: "Healthcare Software Testing",
				slug: "healthcare-software-testing",
				description:
					"Comprehensive testing to ensure reliability and compliance.",
			},
			{
				id: "telemedicine-app",
				title: "Telemedicine App Development",
				slug: "telemedicine-app-development",
				description: "Secure telemedicine platforms for remote patient care.",
			},
			{
				id: "healthcare-website",
				title: "Healthcare Website Design",
				slug: "healthcare-website-design",
				description:
					"Professional websites for healthcare providers and organizations.",
			},
		],
	},
	{
		id: "education",
		industry: "Education",
		slug: "education",
		description:
			"Transform learning experiences with innovative educational technology solutions.",
		image:
			"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
		imageAlt: "Education technology solutions",
		services: [
			{
				id: "education-software",
				title: "Education Software Development",
				slug: "education-software-development",
				description:
					"Custom educational software for institutions and EdTech startups.",
			},
			{
				id: "education-app",
				title: "Education App Development",
				slug: "education-app-development",
				description: "Mobile learning applications for students and educators.",
			},
			{
				id: "lms-dev",
				title: "LMS Development Services",
				slug: "lms-development-services",
				description:
					"Learning Management Systems tailored to your educational needs.",
			},
			{
				id: "elearning-app",
				title: "E-learning Application Development",
				slug: "e-learning-application-development",
				description: "Interactive e-learning platforms for online education.",
			},
			{
				id: "elearning-software",
				title: "E-learning Software Development",
				slug: "e-learning-software-development",
				description:
					"Comprehensive e-learning solutions with advanced features.",
			},
			{
				id: "education-portals",
				title: "Education Portals Development",
				slug: "education-portals-development",
				description:
					"Student and teacher portals for educational institutions.",
			},
			{
				id: "school-management",
				title: "School Management Software",
				slug: "school-management-software",
				description: "All-in-one school administration and management systems.",
			},
		],
	},
	{
		id: "finance",
		industry: "Finance",
		slug: "finance",
		description:
			"Secure, compliant financial technology solutions built with enterprise-grade security.",
		image:
			"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
		imageAlt: "Finance technology solutions",
		services: [
			{
				id: "financial-software",
				title: "Financial Software Development",
				slug: "financial-software-development",
				description: "Custom fintech solutions for modern financial services.",
			},
			{
				id: "financial-web-design",
				title: "Web Design for Financial Services",
				slug: "web-design-for-financial-services",
				description:
					"Professional websites for financial institutions and services.",
			},
			{
				id: "financial-mobile-app",
				title: "Financial Mobile App Development",
				slug: "financial-mobile-app-development",
				description: "Secure mobile banking and fintech applications.",
			},
			{
				id: "banking-apps",
				title: "Banking Apps Development",
				slug: "banking-apps-development",
				description:
					"Full-featured banking applications with advanced security.",
			},
			{
				id: "payment-app",
				title: "Payment App Development",
				slug: "payment-app-development",
				description: "Payment processing applications and digital wallets.",
			},
			{
				id: "payment-integration",
				title: "Payment Integration Services",
				slug: "payment-integration-services",
				description: "Seamless integration of payment gateways and processors.",
			},
		],
	},
	{
		id: "transportation",
		industry: "Transportation & Logistics",
		slug: "transportation-logistics",
		description:
			"Optimize operations with intelligent transportation and logistics solutions.",
		image:
			"https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
		imageAlt: "Transportation and logistics solutions",
		services: [
			{
				id: "transportation-software",
				title: "Transportation Software Development",
				slug: "transportation-software-development",
				description:
					"Custom software for transportation companies and logistics providers.",
			},
			{
				id: "logistics-app",
				title: "Logistics App Development",
				slug: "logistics-app-development",
				description:
					"Mobile and web apps for logistics management and tracking.",
			},
			{
				id: "logistics-web-design",
				title: "Logistics Web Design",
				slug: "logistics-web-design",
				description:
					"Professional websites for logistics and transportation companies.",
			},
			{
				id: "transportation-management",
				title: "Transportation Management Software",
				slug: "transportation-management-software",
				description:
					"Comprehensive TMS solutions for fleet and route optimization.",
			},
			{
				id: "supply-chain-software",
				title: "Supply Chain Software Development",
				slug: "supply-chain-software-development",
				description: "End-to-end supply chain management systems.",
			},
		],
	},
	{
		id: "ai-ml",
		industry: "Machine Learning & AI",
		slug: "machine-learning-ai",
		description:
			"Cutting-edge AI solutions powered by deep engineering expertise.",
		services: [
			{
				id: "ai-consulting",
				title: "AI Consulting Services",
				slug: "ai-consulting-services",
				description: "Strategic AI consulting from experienced ML engineers.",
			},
			{
				id: "ai-development",
				title: "AI Development Services",
				slug: "ai-development-services",
				description: "Custom AI solutions and machine learning models.",
			},
			{
				id: "ai-integration",
				title: "AI Integration Services",
				slug: "ai-integration-services",
				description:
					"Seamless integration of AI capabilities into existing systems.",
			},
			{
				id: "ai-chatbot",
				title: "AI Chatbot Development",
				slug: "ai-chatbot-development",
				description: "Intelligent chatbots powered by advanced NLP and LLMs.",
			},
			{
				id: "chatgpt-integration",
				title: "ChatGPT Integration",
				slug: "chatgpt-integration",
				description: "Custom ChatGPT and LLM integrations for your products.",
			},
		],
	},
];
