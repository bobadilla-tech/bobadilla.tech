import type { ServicePageData, ProcessStep } from "@/features/services/model/types";
import { sharedTechStack } from "@/features/services/model/types";

const sharedProcessSteps: ProcessStep[] = [
	{
		title: "Definição do projeto",
		description: "Entendemos seus objetivos, usuários e métricas de sucesso",
	},
	{
		title: "Pesquisa e análise",
		description:
			"Análise competitiva, pesquisa de usuários e viabilidade técnica",
	},
	{
		title: "Stack tecnológica e arquitetura",
		description:
			"Selecionamos as tecnologias certas para escalabilidade e desempenho",
	},
	{
		title: "Design e experiência do usuário",
		description: "Wireframes, protótipos e design visual que converte",
	},
	{
		title: "Desenvolvimento e QA",
		description: "Desenvolvimento ágil com testes contínuos e feedback",
	},
	{
		title: "Lançamento e crescimento",
		description: "Implantação, monitoramento e otimização contínua",
	},
];

const sharedFaq = [
	{
		q: "Com que rapidez vocês entregam um projeto?",
		a: "Dependendo da complexidade, MVPs podem ser entregues em 2–4 semanas, produtos completos em 6–12 semanas. Nos comprometemos com prazos claros desde o início.",
	},
	{
		q: "O que acontece se os prazos não forem cumpridos?",
		a: "Garantimos nossos compromissos de entrega. Se perdermos um prazo, trabalhamos horas extras sem custo adicional até que esteja concluído.",
	},
	{
		q: "Vocês trabalham com startups?",
		a: "Com certeza — trabalhamos com startups em estágio inicial até equipes empresariais. Adaptamos nosso processo ao seu estágio e orçamento.",
	},
	{
		q: "Vocês oferecem suporte após o lançamento?",
		a: "Sim. Oferecemos pacotes contínuos de manutenção, monitoramento e crescimento para que seu produto continue melhorando após o lançamento.",
	},
];

export const servicePages: ServicePageData[] = [
	// ─── WEB DEV ────────────────────────────────────────────────────────────
	{
		slug: "web-development",
		eyebrow: "SERVIÇOS DE DESENVOLVIMENTO WEB",
		heroLine1: "SOLUÇÕES WEB QUE",
		heroLine2: "GERAM RESULTADOS REAIS",
		heroSubtitle:
			"Desenvolvemos sites, aplicações e plataformas modernas otimizadas para velocidade, engajamento do usuário e crescimento sustentável.",
		urgencyBandText:
			"Pare de desperdiçar tempo e dinheiro. Vamos construir do jeito certo.",
		urgencyBandCta: "INICIE SEU PROJETO",
		painPointsHeading: "3 ERROS CUSTOSOS NO DESENVOLVIMENTO WEB",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Meses de trabalho, nada a mostrar",
				description:
					"Construir funcionalidades que ninguém precisa enquanto perde sua janela de mercado.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipes de desenvolvimento instáveis",
				description:
					"Freelancers desaparecem, agências rotacionam, e o conhecimento do seu projeto vai junto.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Código que não cresce com você",
				description: "Os atalhos de hoje se tornam reescritas caras amanhã.",
			},
		],
		servicesHeading: "SERVIÇOS DE DESENVOLVIMENTO QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Aplicações web personalizadas",
				description:
					"Apps web poderosas construídas do zero, alinhadas com seus fluxos de trabalho, necessidades dos usuários e objetivos de negócio.",
			},
			{
				title: "Soluções web para e-commerce",
				description:
					"Lojas online escaláveis com UX fluida, integrações inteligentes e funcionalidades construídas para crescimento.",
			},
			{
				title: "Portais web com controle de acesso",
				description:
					"Portais seguros com acesso por funções, dashboards personalizados e fluxos de usuário otimizados.",
			},
			{
				title: "Sites corporativos e de marketing",
				description:
					"Sites de alto impacto com design responsivo e interfaces atraentes que geram conversões.",
			},
			{
				title: "Sites headless e baseados em CMS",
				description:
					"Sites modernos orientados a conteúdo com plataformas CMS flexíveis para gerenciamento fácil e controlado.",
			},
			{
				title: "Modernização e migração de plataformas",
				description:
					"Transforme sistemas legados em plataformas modernas — mais rápidas, mais seguras e mais fáceis de manter.",
			},
		],
		processHeading: "NOSSO PROCESSO DE DESENVOLVIMENTO",
		processSubtitle:
			"Da primeira conversa até a implantação final, combinamos expertise técnica com pensamento de negócio.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── CMS ────────────────────────────────────────────────────────────────
	{
		slug: "cms-development",
		eyebrow: "SERVIÇOS DE DESENVOLVIMENTO CMS",
		heroLine1: "IMPULSIONANDO SEU",
		heroLine2: "CRESCIMENTO DIGITAL",
		heroSubtitle:
			"Criamos soluções digitais personalizadas que não apenas ficam bonitas, mas também geram resultados reais e apoiam seu negócio enquanto cresce.",
		painPointsHeading: "POR QUE NÓS?",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Excelente desempenho",
				description:
					"A arquitetura CMS headless oferece carregamentos de página ultrarrápidos e experiências de usuário fluidas.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Flexibilidade total",
				description:
					"Edite conteúdo facilmente enquanto os desenvolvedores trabalham de forma independente em funcionalidades e integrações.",
			},
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Segurança empresarial",
				description:
					"Permissões por função, logs de auditoria e endpoints de API seguros protegem seu conteúdo e usuários.",
			},
		],
		servicesHeading: "SERVIÇOS CMS QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Arquitetura CMS headless",
				description:
					"Desacople seu frontend do gerenciamento de conteúdo para máxima flexibilidade e velocidade.",
			},
			{
				title: "Configuração de Sanity e Strapi",
				description:
					"Configure e estenda plataformas CMS open-source líderes adaptadas ao seu modelo de conteúdo.",
			},
			{
				title: "Shopify e BigCommerce",
				description:
					"Construções completas de e-commerce com temas personalizados, apps e integrações que escalam.",
			},
			{
				title: "Migrações de conteúdo",
				description:
					"Migre conteúdo de sistemas legados com segurança, sem perda de dados nem impacto em SEO.",
			},
			{
				title: "Integrações de API CMS",
				description:
					"Conecte seu CMS a serviços de terceiros — análises, e-mail, gateways de pagamento e mais.",
			},
			{
				title: "Design de experiência de edição",
				description:
					"Crie interfaces de edição intuitivas para que sua equipe publique sem precisar de ajuda de desenvolvedores.",
			},
		],
		processHeading: "NOSSO FLUXO DE TRABALHO",
		processSubtitle:
			"Da primeira conversa até a implantação final, combinamos expertise técnica com pensamento de negócio para construir soluções que geram resultados reais.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB APPLICATION ────────────────────────────────────────────────────
	{
		slug: "web-application-development",
		eyebrow: "DESENVOLVIMENTO DE APLICAÇÕES WEB",
		heroLine1: "APLICAÇÕES CONSTRUÍDAS PARA",
		heroLine2: "ESCALA E DESEMPENHO",
		heroSubtitle:
			"Aplicações web personalizadas projetadas em torno dos seus fluxos de trabalho — rápidas, seguras e prontas para crescer com seu negócio.",
		reasonsHeadingLine1: "POR QUE NOSSAS APLICAÇÕES WEB",
		reasonsHeadingLine2: "SE DESTACAM",
		painPointsHeading: "ERROS COMUNS EM APPS WEB",
		painPoints: [
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Baixa escalabilidade desde o dia um",
				description:
					"Apps construídas sem pensar no crescimento colapsam sob cargas reais de usuários.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipes desconectadas",
				description:
					"Os silos de frontend e backend levam a bugs de integração e entregas lentas.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "O scope descontrolado mata os prazos",
				description:
					"O escopo cresce sem controle e os produtos são lançados meses atrasados com as funcionalidades erradas.",
			},
		],
		servicesHeading: "SERVIÇOS DE APPS WEB QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Desenvolvimento de produtos SaaS",
				description:
					"Aplicações SaaS full-stack com autenticação, cobrança, multi-tenancy e dashboards de administração.",
			},
			{
				title: "Ferramentas internas e dashboards",
				description:
					"Ferramentas de back-office personalizadas que substituem planilhas e softwares genéricos.",
			},
			{
				title: "Aplicações em tempo real",
				description:
					"Apps alimentadas por WebSocket para colaboração ao vivo, notificações e dados em streaming.",
			},
			{
				title: "Arquitetura API-first",
				description:
					"APIs RESTful e GraphQL construídas para longevidade e integração fácil.",
			},
			{
				title: "Progressive web apps",
				description:
					"Apps instaláveis com capacidade offline e desempenho nativo em qualquer dispositivo.",
			},
			{
				title: "Modernização de legados",
				description:
					"Refatore e redesenhe apps web antigas em sistemas sustentáveis e escaláveis.",
			},
		],
		processHeading: "NOSSO PROCESSO DE DESENVOLVIMENTO",
		processSubtitle:
			"Entrega estruturada do discovery até o lançamento, sem surpresas no caminho.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── WEB PORTAL ─────────────────────────────────────────────────────────
	{
		slug: "web-portal-development",
		eyebrow: "DESENVOLVIMENTO DE PORTAIS WEB",
		heroLine1: "PORTAIS QUE CONECTAM",
		heroLine2: "PESSOAS E PROCESSOS",
		heroSubtitle:
			"Portais para clientes, fornecedores e intranets para funcionários — construídos com controle de acesso seguro e fluxos de usuário fluidos.",
		highlightsHeading: "TUDO O QUE OS USUÁRIOS PRECISAM EM UM SÓ LUGAR",
		highlights: [
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Dashboard unificado",
				description:
					"Dê a cada perfil uma visão única do portal com as ferramentas, alertas e dados mais importantes.",
			},
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Acesso seguro por função",
				description:
					"Proteja dados sensíveis com camadas de permissão adaptadas por função, equipe e conta.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Automação de fluxos",
				description:
					"Substitua tarefas repetitivas por aprovações, notificações e fluxos de autoatendimento.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Sistemas conectados",
				description:
					"Sincronize ERP, CRM, faturamento e suporte para que os usuários sempre trabalhem com dados atualizados.",
			},
		],
		painPointsHeading: "DESAFIOS DE PORTAIS QUE RESOLVEMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Controle de acesso frágil",
				description:
					"Permissões incorretas expõem dados sensíveis ou bloqueiam os usuários que precisam deles.",
			},
			{
				icon: "/assets/services/pain-points/manufacturing.svg",
				title: "Baixa visibilidade de dados",
				description:
					"Os usuários não encontram o que precisam — gerando tickets de suporte e ineficiência.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Sistemas desconectados",
				description:
					"Ferramentas isoladas significam entrada manual de dados e nenhuma fonte única de verdade.",
			},
		],
		servicesHeading: "SERVIÇOS DE PORTAIS QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Portais para clientes",
				description:
					"Portais com marca para clientes rastrearem pedidos, faturas e tickets de suporte em um só lugar.",
			},
			{
				title: "Portais de fornecedores e parceiros",
				description:
					"Otimize os relacionamentos com fornecedores com onboarding, gestão de documentos e relatórios.",
			},
			{
				title: "Intranets para funcionários",
				description:
					"Portais internos para RH, políticas, comunicados e colaboração de equipes.",
			},
			{
				title: "Controle de acesso por função",
				description:
					"Sistemas de permissões granulares que garantem que os usuários vejam apenas o que estão autorizados a acessar.",
			},
			{
				title: "Dashboards personalizados",
				description:
					"Visualizações ricas em dados adaptadas a cada função de usuário — de executivos a trabalhadores de campo.",
			},
			{
				title: "Integrações com terceiros",
				description:
					"Conecte portais a ERP, CRM, contabilidade e plataformas de comunicação.",
			},
		],
		processHeading: "NOSSO PROCESSO DE DESENVOLVIMENTO",
		processSubtitle:
			"Abordagem discovery-first para entender seus usuários antes de escrever uma única linha de código.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── FRONTEND ───────────────────────────────────────────────────────────
	{
		slug: "front-end-development",
		eyebrow: "DESENVOLVIMENTO FRONTEND",
		heroLine1: "INTERFACES QUE OS USUÁRIOS",
		heroLine2: "ADORAM USAR",
		heroSubtitle:
			"Frontends pixel-perfect e de alto desempenho construídos com React e Next.js — projetados para converter e engenheirados para durar.",
		painPointsHeading: "PROBLEMAS FRONTEND QUE RESOLVEMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/acute.svg",
				title: "Tempos de carregamento lentos",
				description:
					"Cada 100ms de atraso custa taxa de conversão. Construímos para Core Web Vitals desde o início.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "UI inconsistente entre plataformas",
				description:
					"A deriva de pixels entre design e código corrói a confiança e a consistência da marca.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Bibliotecas de componentes impossíveis de manter",
				description:
					"O código de componentes espaguete desacelera cada nova funcionalidade e torna os refactors dolorosos.",
			},
		],
		servicesHeading: "SERVIÇOS FRONTEND QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Aplicações React e Next.js",
				description:
					"Apps React modernas, server-rendered ou estáticas, otimizadas para SEO e desempenho.",
				image:
					"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
				imageAlt: "Editor de código frontend com uma aplicação React",
			},
			{
				title: "Implementação de design systems",
				description:
					"Converta designs do Figma em bibliotecas de componentes robustas com documentação completa.",
				image:
					"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
				imageAlt: "Ambiente de design system e planejamento de UI",
			},
			{
				title: "Otimização de desempenho",
				description:
					"Análise de bundles, lazy loading e estratégias de cache para atingir Core Web Vitals no verde.",
				image:
					"https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200&q=80",
				imageAlt: "Estação de desenvolvimento focada em performance",
			},
			{
				title: "UI responsiva e adaptativa",
				description:
					"Interfaces que funcionam perfeitamente em cada breakpoint e dispositivo.",
				image:
					"https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&q=80",
				imageAlt: "Interface responsiva exibida em múltiplos dispositivos",
			},
			{
				title: "Acessibilidade (WCAG)",
				description:
					"Frontends conformes com AA que funcionam para cada usuário, com ou sem tecnologia assistiva.",
				image:
					"https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80",
				imageAlt: "Interface digital acessível e interação inclusiva",
			},
			{
				title: "Arquitetura frontend",
				description:
					"Monorepos escaláveis, gerenciamento de estado e padrões de fetching de dados para equipes grandes.",
				image:
					"https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80",
				imageAlt: "Diagramas de arquitetura de software para frontend",
			},
		],
		processHeading: "NOSSO PROCESSO FRONTEND",
		processSubtitle:
			"Fluxos de trabalho de design a código que eliminam idas e vindas e entregam resultados pixel-perfect.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── BACKEND ────────────────────────────────────────────────────────────
	{
		slug: "back-end-development",
		eyebrow: "DESENVOLVIMENTO BACKEND",
		heroLine1: "BACKENDS CONSTRUÍDOS PARA",
		heroLine2: "CONFIABILIDADE E ESCALA",
		heroSubtitle:
			"De APIs REST a microsserviços event-driven — arquitetamos sistemas backend que lidam com carga real de produção.",
		painPointsHeading: "RISCOS BACKEND QUE ELIMINAMOS",
		painPoints: [
			{
				icon: "/assets/services/pain-points/encrypted.svg",
				title: "Vulnerabilidades de segurança no núcleo",
				description:
					"APIs inseguras, entradas não validadas e autenticação ausente são os erros mais custosos em produção.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Monolitos que não conseguem escalar",
				description:
					"O código fortemente acoplado torna impossível escalar serviços individuais sem reescrever tudo.",
			},
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Sem observabilidade, sem controle",
				description:
					"Quando algo quebra em produção, equipes sem logs e rastreamento voam às cegas.",
			},
		],
		servicesHeading: "SERVIÇOS BACKEND QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "APIs REST e GraphQL",
				description:
					"APIs bem documentadas e versionadas que se integram limpoamente com qualquer frontend ou terceiro.",
			},
			{
				title: "Arquitetura de microsserviços",
				description:
					"Serviços independentes e implantáveis conectados via filas de mensagens e service meshes.",
			},
			{
				title: "Autenticação e autorização",
				description:
					"JWT, OAuth2, RBAC — fluxos de autenticação seguros para cada caso de uso.",
			},
			{
				title: "Design e otimização de banco de dados",
				description:
					"Design de esquema, estratégias de indexação e otimização de consultas para sistemas de alto tráfego.",
			},
			{
				title: "Jobs em background e filas",
				description:
					"Processamento de tarefas confiável com RabbitMQ, Bull ou SQS — sem jobs perdidos.",
			},
			{
				title: "Infraestrutura cloud (AWS)",
				description:
					"Funções serverless, contêineres e serviços gerenciados implantados com infraestrutura como código.",
			},
		],
		processHeading: "NOSSO PROCESSO BACKEND",
		processSubtitle:
			"Abordagem arquitetura-primeiro que previne reescritas caras e indisponibilidades não planejadas.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MOBILE ─────────────────────────────────────────────────────────────
	{
		slug: "mobile-app-development",
		eyebrow: "DESENVOLVIMENTO MÓVEL",
		heroLine1: "APPS QUE AS PESSOAS",
		heroLine2: "NÃO CONSEGUEM LARGAR",
		heroSubtitle:
			"Apps móveis multiplataforma para iOS e Android — construídas com React Native e testadas em dispositivos reais.",
		painPointsHeading: "ERROS MÓVEIS A EVITAR",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Tempo ao mercado lento",
				description:
					"Codebases nativas separadas para iOS/Android dobram seu tempo e orçamento de desenvolvimento.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Alta taxa de rejeição nas lojas",
				description:
					"Apps rejeitadas na revisão desperdiçam semanas e destroem o momentum do lançamento.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Desempenho ruim no dispositivo",
				description:
					"Apps que travam, crasham ou drenam a bateria são desinstaladas na primeira sessão.",
			},
		],
		servicesHeading: "SERVIÇOS MÓVEIS QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Apps com React Native",
				description:
					"Uma única codebase para iOS e Android — 90% de código compartilhado com desempenho nativo.",
			},
			{
				title: "Lançamento na App Store e Google Play",
				description:
					"Cuidamos do envio às lojas, metadados, capturas de tela e conformidade com revisão.",
			},
			{
				title: "Notificações push e deep links",
				description:
					"Funcionalidades que impulsionam o engajamento e trazem usuários de volta no momento certo.",
			},
			{
				title: "Arquitetura offline-first",
				description:
					"Apps que funcionam sem internet e sincronizam perfeitamente quando a conectividade retorna.",
			},
			{
				title: "Integração de API e sincronização em tempo real",
				description:
					"Conecte seu app a qualquer backend com fetching de dados confiável e atualizações ao vivo.",
			},
			{
				title: "Otimização de desempenho móvel",
				description:
					"Perfil e correção de gargalos de renderização, vazamentos de memória e problemas de tempo de inicialização.",
			},
		],
		processHeading: "NOSSO PROCESSO MÓVEL",
		processSubtitle:
			"De wireframe à loja de apps em semanas, não meses — com testes em dispositivos reais em cada etapa.",
		processSteps: sharedProcessSteps,
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},

	// ─── MVP ────────────────────────────────────────────────────────────────
	{
		slug: "mvp-development",
		eyebrow: "DESENVOLVIMENTO DE MVP",
		heroLine1: "DE IDEIA A",
		heroLine2: "PRODUTO EM SEMANAS",
		heroSubtitle:
			"Construímos MVPs focados que validam sua hipótese central, lançam rápido e fornecem dados reais de usuários para crescer.",
		painPointsHeading: "POR QUE A MAIORIA DOS MVPs FALHA",
		painPoints: [
			{
				icon: "/assets/services/pain-points/calendar-clock.svg",
				title: "Construir demais, cedo demais",
				description:
					"V1s cheias de funcionalidades levam 12 meses e não validam nada. O escopo deve ser cortado sem piedade.",
			},
			{
				icon: "/assets/services/pain-points/social-distance.svg",
				title: "Equipe errada, velocidade errada",
				description:
					"Agências que tratam MVPs como projetos empresariais perdem todo o ponto de um protótipo.",
			},
			{
				icon: "/assets/services/pain-points/aq-indoor.svg",
				title: "Sem caminho para escalar",
				description:
					"MVPs construídos com código descartável bloqueiam o crescimento e exigem reescritas completas na Série A.",
			},
		],
		servicesHeading: "SERVIÇOS MVP QUE OFERECEMOS",
		servicesOffered: [
			{
				title: "Workshop de definição de escopo",
				description:
					"Ajudamos você a identificar a única funcionalidade central que valida sua hipótese — nada mais.",
			},
			{
				title: "Entrega em sprint de 2–4 semanas",
				description:
					"Software funcionando nas suas mãos rapidamente, para que possa começar a coletar feedback real de usuários.",
			},
			{
				title: "Landing page + lista de espera",
				description:
					"Valide a demanda antes de construir com uma landing page de alta conversão e captura de e-mail.",
			},
			{
				title: "Autenticação e onboarding de usuários",
				description:
					"Autenticação sólida, fluxos de onboarding e gerenciamento de usuários desde o dia um.",
			},
			{
				title: "Análises e loops de feedback",
				description:
					"Mixpanel, PostHog ou rastreamento personalizado para saber o que os usuários realmente fazem.",
			},
			{
				title: "Roadmap MVP → V2",
				description:
					"Após o lançamento, ajudamos você a priorizar as funcionalidades que importam com base em dados reais.",
			},
		],
		processHeading: "NOSSO PROCESSO MVP",
		processSubtitle:
			"Quatro passos focados para ir de ideia a produto ao vivo sem movimentos desperdiçados.",
		processSteps: sharedProcessSteps.slice(0, 4),
		techStack: sharedTechStack,
		faqOverrides: sharedFaq,
	},
];
