import type { ServicePageData, ProcessStep } from "@/features/services/model/types";
import { sharedTechStack } from "@/features/services/model/types";

const sharedProcessSteps: ProcessStep[] = [
	{
		title: "Definición del proyecto",
		description: "Entendemos tus objetivos, usuarios y métricas de éxito",
	},
	{
		title: "Investigación y análisis",
		description:
			"Análisis competitivo, investigación de usuarios y viabilidad técnica",
	},
	{
		title: "Stack tecnológico y arquitectura",
		description:
			"Seleccionamos las tecnologías adecuadas para escalabilidad y rendimiento",
	},
	{
		title: "Diseño y experiencia de usuario",
		description: "Wireframes, prototipos y diseño visual que convierte",
	},
	{
		title: "Desarrollo y QA",
		description: "Desarrollo ágil con pruebas continuas y retroalimentación",
	},
	{
		title: "Lanzamiento y crecimiento",
		description: "Despliegue, monitoreo y optimización continua",
	},
];

const sharedFaq = [
	{
		q: "¿Qué tan rápido pueden entregar un proyecto?",
		a: "Según la complejidad, los MVPs pueden entregarse en 2–4 semanas, los productos completos en 6–12 semanas. Nos comprometemos con plazos claros desde el inicio.",
	},
	{
		q: "¿Qué pasa si no se cumplen los plazos?",
		a: "Garantizamos nuestros compromisos de entrega. Si no cumplimos un plazo, trabajamos horas extra sin costo adicional hasta que esté listo.",
	},
	{
		q: "¿Trabajan con startups?",
		a: "Absolutamente — hemos trabajado con startups en etapas tempranas hasta equipos empresariales. Adaptamos nuestro proceso a tu etapa y presupuesto.",
	},
	{
		q: "¿Ofrecen soporte después del lanzamiento?",
		a: "Sí. Ofrecemos paquetes de mantenimiento continuo, monitoreo y crecimiento para que tu producto siga mejorando después del lanzamiento.",
	},
];

export const servicePages: ServicePageData[] = [
	// ─── WEB DEV ────────────────────────────────────────────────────────────
	{
		slug: "web-development",
		eyebrow: "SERVICIOS DE DESARROLLO WEB",
		heroLine1: "SOLUCIONES WEB QUE",
		heroLine2: "IMPULSAN RESULTADOS REALES",
		heroSubtitle:
			"Desarrollamos sitios web, aplicaciones y plataformas modernas optimizadas para velocidad, compromiso del usuario y crecimiento sostenible.",
		urgencyBandText: "Deja de perder tiempo y dinero. Construyámoslo bien.",
		urgencyBandCta: "INICIA TU PROYECTO",
		painPointsHeading: "3 ERRORES COSTOSOS EN DESARROLLO WEB",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Meses de trabajo, nada que mostrar",
				description:
					"Construir funciones que nadie necesita mientras pierdes tu ventana de mercado.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipos de desarrollo inestables",
				description:
					"Los freelancers desaparecen, las agencias rotan, y el conocimiento de tu proyecto se va con ellos.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Código que no puede crecer contigo",
				description:
					"Los atajos de hoy se convierten en costosas reescrituras mañana.",
			},
		],
		servicesHeading: "SERVICIOS DE DESARROLLO QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Aplicaciones web personalizadas",
				description:
					"Apps web potentes construidas desde cero, alineadas con tus flujos de trabajo, necesidades de usuarios y objetivos de negocio.",
			},
			{
				title: "Soluciones web para e-commerce",
				description:
					"Tiendas en línea escalables con UX fluida, integraciones inteligentes y funciones diseñadas para el crecimiento.",
			},
			{
				title: "Portales web con control de acceso",
				description:
					"Portales seguros con acceso por roles, dashboards personalizados y flujos de usuario optimizados.",
			},
			{
				title: "Sitios corporativos y de marketing",
				description:
					"Sitios web de alto impacto con diseño responsivo e interfaces atractivas que generan conversiones.",
			},
			{
				title: "Sitios headless y basados en CMS",
				description:
					"Sitios modernos orientados al contenido con plataformas CMS flexibles para una gestión fácil y controlada.",
			},
			{
				title: "Modernización y migración de plataformas",
				description:
					"Transforma sistemas heredados en plataformas modernas — más rápidas, más seguras y más fáciles de mantener.",
			},
		],
		processHeading: "NUESTRO PROCESO DE DESARROLLO",
		processSubtitle:
			"Desde la primera conversación hasta el despliegue final, combinamos experiencia técnica con pensamiento de negocio.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── CMS ────────────────────────────────────────────────────────────────
	{
		slug: "cms-development",
		eyebrow: "SERVICIOS DE DESARROLLO CMS",
		heroLine1: "IMPULSANDO TU",
		heroLine2: "CRECIMIENTO DIGITAL",
		heroSubtitle:
			"Creamos soluciones digitales personalizadas que no solo lucen bien, sino que también generan resultados reales y apoyan tu negocio mientras crece.",
		painPointsHeading: "¿POR QUÉ NOSOTROS?",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Excelente rendimiento",
				description:
					"La arquitectura CMS headless ofrece cargas de página ultrarrápidas y experiencias de usuario fluidas.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Flexibilidad total",
				description:
					"Edita contenido fácilmente mientras los desarrolladores trabajan de forma independiente en funciones e integraciones.",
			},
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Seguridad empresarial",
				description:
					"Permisos por roles, registros de auditoría y endpoints API seguros protegen tu contenido y usuarios.",
			},
		],
		servicesHeading: "SERVICIOS CMS QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Arquitectura CMS headless",
				description:
					"Desacopla tu frontend de la gestión de contenido para máxima flexibilidad y velocidad.",
			},
			{
				title: "Configuración de Sanity y Strapi",
				description:
					"Configura y extiende plataformas CMS de código abierto líderes adaptadas a tu modelo de contenido.",
			},
			{
				title: "Shopify y BigCommerce",
				description:
					"Construcciones completas de e-commerce con temas personalizados, apps e integraciones que escalan.",
			},
			{
				title: "Migraciones de contenido",
				description:
					"Migra contenido de sistemas heredados de forma segura sin pérdida de datos ni impacto en SEO.",
			},
			{
				title: "Integraciones de API CMS",
				description:
					"Conecta tu CMS a servicios de terceros, incluyendo analíticas, correo, pasarelas de pago y más.",
			},
			{
				title: "Diseño de experiencia de edición",
				description:
					"Crea interfaces de edición intuitivas para que tu equipo publique sin necesitar ayuda de desarrolladores.",
			},
		],
		processHeading: "NUESTRO FLUJO DE TRABAJO",
		processSubtitle:
			"Desde la primera conversación hasta el despliegue final, combinamos experiencia técnica con pensamiento de negocio para construir soluciones que generan resultados reales.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB APPLICATION ────────────────────────────────────────────────────
	{
		slug: "web-application-development",
		eyebrow: "DESARROLLO DE APLICACIONES WEB",
		heroLine1: "APLICACIONES CONSTRUIDAS PARA",
		heroLine2: "ESCALA Y RENDIMIENTO",
		heroSubtitle:
			"Aplicaciones web personalizadas diseñadas en torno a tus flujos de trabajo — rápidas, seguras y listas para crecer con tu negocio.",
		reasonsHeadingLine1: "POR QUÉ NUESTRAS APPS WEB",
		reasonsHeadingLine2: "DESTACAN",
		painPointsHeading: "ERRORES COMUNES EN APPS WEB",
		painPoints: [
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Poca escalabilidad desde el día uno",
				description:
					"Las apps construidas sin pensar en el crecimiento colapsan bajo cargas reales de usuarios.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipos desconectados",
				description:
					"Los silos de frontend y backend generan errores de integración y entregas lentas.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "El scope sin control mata los plazos",
				description:
					"El alcance crece sin control y los productos se lanzan meses tarde con las funciones equivocadas.",
			},
		],
		servicesHeading: "SERVICIOS DE APPS WEB QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Desarrollo de productos SaaS",
				description:
					"Aplicaciones SaaS full-stack con autenticación, facturación, multi-tenancy y dashboards de administración.",
			},
			{
				title: "Herramientas internas y dashboards",
				description:
					"Herramientas de back-office personalizadas que reemplazan hojas de cálculo y software genérico.",
			},
			{
				title: "Aplicaciones en tiempo real",
				description:
					"Apps impulsadas por WebSocket para colaboración en vivo, notificaciones y datos en streaming.",
			},
			{
				title: "Arquitectura API-first",
				description:
					"APIs RESTful y GraphQL construidas para la longevidad y fácil integración.",
			},
			{
				title: "Progressive web apps",
				description:
					"Apps instalables con capacidad offline y rendimiento nativo en cualquier dispositivo.",
			},
			{
				title: "Modernización de legados",
				description:
					"Refactoriza y rediseña apps web envejecidas en sistemas mantenibles y escalables.",
			},
		],
		processHeading: "NUESTRO PROCESO DE DESARROLLO",
		processSubtitle:
			"Entrega estructurada desde el descubrimiento hasta el lanzamiento, sin sorpresas en el camino.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB PORTAL ─────────────────────────────────────────────────────────
	{
		slug: "web-portal-development",
		eyebrow: "DESARROLLO DE PORTALES WEB",
		heroLine1: "PORTALES QUE CONECTAN",
		heroLine2: "PERSONAS Y PROCESOS",
		heroSubtitle:
			"Portales para clientes, proveedores e intranets para empleados — construidos con control de acceso seguro y flujos de usuario fluidos.",
		highlightsHeading: "TODO LO QUE LOS USUARIOS NECESITAN EN UN SOLO LUGAR",
		highlights: [
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Dashboard unificado",
				description:
					"Da a cada rol una vista única del portal con las herramientas, alertas y datos que más necesita.",
			},
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Acceso seguro por roles",
				description:
					"Protege datos sensibles con capas de permisos que se adaptan por rol, equipo y cuenta.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Automatización de flujos",
				description:
					"Reemplaza tareas repetitivas con aprobaciones, notificaciones y flujos de autoservicio.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Sistemas conectados",
				description:
					"Sincroniza ERP, CRM, facturación y soporte para que los usuarios siempre trabajen con información actualizada.",
			},
		],
		painPointsHeading: "DESAFÍOS DE PORTALES QUE RESOLVEMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Control de acceso frágil",
				description:
					"Los permisos incorrectos exponen datos sensibles o bloquean a los usuarios que los necesitan.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Poca visibilidad de datos",
				description:
					"Los usuarios no encuentran lo que necesitan, lo que genera tickets de soporte e ineficiencia.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Sistemas desconectados",
				description:
					"Las herramientas aisladas implican entrada manual de datos y ninguna fuente única de verdad.",
			},
		],
		servicesHeading: "SERVICIOS DE PORTALES QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Portales para clientes",
				description:
					"Portales de marca para que los clientes rastreen pedidos, facturas y tickets de soporte en un solo lugar.",
			},
			{
				title: "Portales de proveedores y socios",
				description:
					"Optimiza las relaciones con proveedores con onboarding, gestión de documentos y reportes.",
			},
			{
				title: "Intranets para empleados",
				description:
					"Portales internos para RRHH, políticas, anuncios y colaboración de equipos.",
			},
			{
				title: "Control de acceso por roles",
				description:
					"Sistemas de permisos granulares que garantizan que los usuarios solo vean lo que están autorizados a acceder.",
			},
			{
				title: "Dashboards personalizados",
				description:
					"Vistas ricas en datos adaptadas a cada rol de usuario — desde ejecutivos hasta trabajadores de campo.",
			},
			{
				title: "Integraciones con terceros",
				description:
					"Conecta portales a ERP, CRM, contabilidad y plataformas de comunicación.",
			},
		],
		processHeading: "NUESTRO PROCESO DE DESARROLLO",
		processSubtitle:
			"Enfoque discovery-first para entender a tus usuarios antes de escribir una sola línea de código.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── FRONTEND ───────────────────────────────────────────────────────────
	{
		slug: "front-end-development",
		eyebrow: "DESARROLLO FRONTEND",
		heroLine1: "INTERFACES QUE LOS USUARIOS",
		heroLine2: "ADORAN USAR",
		heroSubtitle:
			"Frontends de píxel perfecto y alto rendimiento construidos con React y Next.js — diseñados para convertir e ingeniados para durar.",
		painPointsHeading: "PROBLEMAS FRONTEND QUE RESOLVEMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Tiempos de carga lentos",
				description:
					"Cada 100ms de demora cuesta tasa de conversión. Construimos para Core Web Vitals desde el inicio.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "UI inconsistente entre plataformas",
				description:
					"La deriva de píxeles entre diseño y código erosiona la confianza y consistencia de marca.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Librerías de componentes inmantenibles",
				description:
					"El código de componentes espagueti ralentiza cada nueva función y hace los refactors dolorosos.",
			},
		],
		servicesHeading: "SERVICIOS FRONTEND QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Aplicaciones React y Next.js",
				description:
					"Apps React modernas, server-rendered o estáticas, optimizadas para SEO y rendimiento.",
				image:
					"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
				imageAlt: "Editor de código frontend con una aplicación React",
			},
			{
				title: "Implementación de design systems",
				description:
					"Convierte diseños de Figma en robustas librerías de componentes con documentación completa.",
				image:
					"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
				imageAlt: "Espacio de trabajo de design system y planificación UI",
			},
			{
				title: "Optimización de rendimiento",
				description:
					"Análisis de bundles, lazy loading y estrategias de caché para alcanzar Core Web Vitals en verde.",
				image:
					"https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&q=80",
				imageAlt: "Estación de desarrollo enfocada en optimización de rendimiento",
			},
			{
				title: "UI responsiva y adaptativa",
				description:
					"Interfaces que funcionan perfectamente en cada breakpoint y dispositivo.",
				image:
					"https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&q=80",
				imageAlt: "Interfaz responsiva mostrada en múltiples dispositivos",
			},
			{
				title: "Accesibilidad (WCAG)",
				description:
					"Frontends conformes con AA que funcionan para cada usuario, con o sin tecnología asistiva.",
				image:
					"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80",
				imageAlt: "Interfaz digital accesible e interacción inclusiva",
			},
			{
				title: "Arquitectura frontend",
				description:
					"Monorepos escalables, gestión de estado y patrones de fetching de datos para equipos grandes.",
				image:
					"https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
				imageAlt: "Diagramas de arquitectura de software para frontend",
			},
		],
		processHeading: "NUESTRO PROCESO FRONTEND",
		processSubtitle:
			"Flujos de trabajo de diseño a código que eliminan los vaivenes y entregan resultados de píxel perfecto.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── BACKEND ────────────────────────────────────────────────────────────
	{
		slug: "back-end-development",
		eyebrow: "DESARROLLO BACKEND",
		heroLine1: "BACKENDS CONSTRUIDOS PARA",
		heroLine2: "CONFIABILIDAD Y ESCALA",
		heroSubtitle:
			"Desde APIs REST hasta microservicios event-driven — arquitectamos sistemas backend que manejan carga real de producción.",
		painPointsHeading: "RIESGOS BACKEND QUE ELIMINAMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Vulnerabilidades de seguridad en el núcleo",
				description:
					"APIs inseguras, entradas no validadas y autenticación faltante son los errores más costosos en producción.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Monolitos que no pueden escalar",
				description:
					"El código fuertemente acoplado hace imposible escalar servicios individuales sin reescribir todo.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Sin observabilidad, sin control",
				description:
					"Cuando algo se rompe en producción, los equipos sin logs ni trazabilidad vuelan a ciegas.",
			},
		],
		servicesHeading: "SERVICIOS BACKEND QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "APIs REST y GraphQL",
				description:
					"APIs bien documentadas y versionadas que se integran limpiamente con cualquier frontend o tercero.",
			},
			{
				title: "Arquitectura de microservicios",
				description:
					"Servicios independientes y desplegables conectados mediante colas de mensajes y service meshes.",
			},
			{
				title: "Autenticación y autorización",
				description:
					"JWT, OAuth2, RBAC — flujos de autenticación seguros para cada caso de uso.",
			},
			{
				title: "Diseño y optimización de bases de datos",
				description:
					"Diseño de esquemas, estrategias de indexación y optimización de consultas para sistemas de alto tráfico.",
			},
			{
				title: "Jobs en segundo plano y colas",
				description:
					"Procesamiento de tareas confiable con RabbitMQ, Bull o SQS — sin trabajos perdidos.",
			},
			{
				title: "Infraestructura cloud (AWS)",
				description:
					"Funciones serverless, contenedores y servicios gestionados desplegados con infraestructura como código.",
			},
		],
		processHeading: "NUESTRO PROCESO BACKEND",
		processSubtitle:
			"Enfoque arquitectura-primero que previene costosas reescrituras e interrupciones no planificadas.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MOBILE ─────────────────────────────────────────────────────────────
	{
		slug: "mobile-app-development",
		eyebrow: "DESARROLLO MÓVIL",
		heroLine1: "APPS QUE LA GENTE",
		heroLine2: "NO PUEDE SOLTAR",
		heroSubtitle:
			"Apps móviles multiplataforma para iOS y Android — construidas con React Native y probadas en dispositivos reales.",
		painPointsHeading: "ERRORES MÓVILES A EVITAR",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Tiempo al mercado lento",
				description:
					"Codebases nativas separadas para iOS/Android duplican tu tiempo y presupuesto de desarrollo.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Alta tasa de rechazo en tiendas",
				description:
					"Las apps rechazadas en revisión desperdician semanas y destruyen el momentum del lanzamiento.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Rendimiento deficiente en dispositivo",
				description:
					"Las apps que se retrasan, crashean o agotan la batería se desinstalan en la primera sesión.",
			},
		],
		servicesHeading: "SERVICIOS MÓVILES QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Apps con React Native",
				description:
					"Una sola codebase para iOS y Android — 90% de código compartido con rendimiento nativo.",
			},
			{
				title: "Lanzamiento en App Store y Google Play",
				description:
					"Manejamos el envío a tiendas, metadatos, capturas de pantalla y cumplimiento de revisión.",
			},
			{
				title: "Notificaciones push y deep links",
				description:
					"Funciones que impulsan el engagement y traen usuarios de vuelta en el momento correcto.",
			},
			{
				title: "Arquitectura offline-first",
				description:
					"Apps que funcionan sin internet y sincronizan sin problemas cuando vuelve la conectividad.",
			},
			{
				title: "Integración de API y sincronización en tiempo real",
				description:
					"Conecta tu app a cualquier backend con fetching de datos confiable y actualizaciones en vivo.",
			},
			{
				title: "Optimización de rendimiento móvil",
				description:
					"Perfila y corrige cuellos de botella de renderizado, fugas de memoria y tiempos de inicio.",
			},
		],
		processHeading: "NUESTRO PROCESO MÓVIL",
		processSubtitle:
			"De wireframe a tienda de apps en semanas, no meses — con pruebas en dispositivos reales en cada etapa.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MVP ────────────────────────────────────────────────────────────────
	{
		slug: "mvp-development",
		eyebrow: "DESARROLLO DE MVP",
		heroLine1: "DE IDEA A",
		heroLine2: "PRODUCTO EN SEMANAS",
		heroSubtitle:
			"Construimos MVPs enfocados que validan tu hipótesis central, lanzan rápido y te dan datos reales de usuarios para crecer.",
		painPointsHeading: "POR QUÉ FALLAN LA MAYORÍA DE MVPs",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Construir demasiado, demasiado pronto",
				description:
					"Las v1 llenas de funciones toman 12 meses y no validan nada. El scope debe recortarse sin piedad.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipo equivocado, velocidad equivocada",
				description:
					"Las agencias que tratan los MVPs como proyectos empresariales pierden el punto entero de un prototipo.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Sin camino hacia la escala",
				description:
					"Los MVPs construidos con código desechable bloquean el crecimiento y requieren reescrituras completas en la Serie A.",
			},
		],
		servicesHeading: "SERVICIOS MVP QUE OFRECEMOS",
		servicesOffered: [
			{
				title: "Workshop de definición de scope",
				description:
					"Te ayudamos a identificar la única función central que valida tu hipótesis — nada más.",
			},
			{
				title: "Entrega en sprint de 2–4 semanas",
				description:
					"Software funcionando en tus manos rápido, para que puedas empezar a recopilar feedback real de usuarios.",
			},
			{
				title: "Landing page + lista de espera",
				description:
					"Valida la demanda antes de construir con una landing page de alta conversión y captura de email.",
			},
			{
				title: "Autenticación y onboarding de usuarios",
				description:
					"Autenticación sólida, flujos de onboarding y gestión de usuarios desde el día uno.",
			},
			{
				title: "Analíticas y loops de feedback",
				description:
					"Mixpanel, PostHog o tracking personalizado para saber qué hacen realmente los usuarios.",
			},
			{
				title: "Roadmap MVP → V2",
				description:
					"Después del lanzamiento, te ayudamos a priorizar las funciones que importan basándonos en datos reales.",
			},
		],
		processHeading: "NUESTRO PROCESO MVP",
		processSubtitle:
			"Cuatro pasos enfocados para ir de idea a producto en vivo sin movimientos desperdiciados.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},
];
