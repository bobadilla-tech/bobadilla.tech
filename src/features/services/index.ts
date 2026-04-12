export { getServiceBySlug, getIndustryBySlug, getRelatedServices } from "./api/queries";
export { allServices, industryServices } from "./model/services";
export type {
	ServicePageData,
	PainPoint,
	ServiceOffer,
	ProcessStep,
	TechCategory,
	MvpSolution,
	MvpForWho,
	Service,
	IndustryService,
} from "./model/types";
export { sharedTechStack } from "./model/types";

export { serviceIconMap, industryIconMap, benefitIcons } from "./constants";

export { default as ServiceHero } from "./components/ServiceHero";
export { default as ServicePainPoints } from "./components/ServicePainPoints";
export { default as ServiceOfferings } from "./components/ServiceOfferings";
export { default as ServiceProcess } from "./components/ServiceProcess";
export { default as ServiceProcessMVP } from "./components/ServiceProcessMVP";
export { default as ServiceTechStack } from "./components/ServiceTechStack";
export { default as ServiceFAQ } from "./components/ServiceFAQ";
export { default as ServiceEstimateCTA } from "./components/ServiceEstimateCTA";
export { default as ServiceReasons } from "./components/ServiceReasons";
export { default as ServiceForWho } from "./components/ServiceForWho";
export { default as ServiceSolutions } from "./components/ServiceSolutions";

export { default as ServicesPage } from "./pages/ServicesPage";
export { default as ServicePage } from "./pages/ServicePage";
export { default as IndustryPage } from "./pages/IndustryPage";
