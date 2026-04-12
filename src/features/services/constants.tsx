import {
	Code,
	Globe,
	Smartphone,
	Database,
	Palette,
	Boxes,
	Rocket,
	Layout,
	Heart,
	GraduationCap,
	DollarSign,
	Truck,
	Brain,
	Zap,
	Shield,
	Clock,
	TrendingUp,
} from "lucide-react";

export const serviceIconMap: Record<string, React.ReactNode> = {
	"web-dev": <Globe className="size-7" />,
	"cms-dev": <Boxes className="size-7" />,
	"mvp-dev": <Rocket className="size-7" />,
	"web-app-dev": <Layout className="size-7" />,
	"mobile-app-dev": <Smartphone className="size-7" />,
	"backend-dev": <Database className="size-7" />,
	"frontend-dev": <Palette className="size-7" />,
	"web-portal-dev": <Code className="size-7" />,
};

export const industryIconMap: Record<string, React.ReactNode> = {
	healthcare: <Heart className="size-8" />,
	education: <GraduationCap className="size-8" />,
	finance: <DollarSign className="size-8" />,
	transportation: <Truck className="size-8" />,
	"ai-ml": <Brain className="size-8" />,
};

export const benefitIcons = [
	<Zap key="zap" className="w-6 h-6" />,
	<Shield key="shield" className="w-6 h-6" />,
	<Clock key="clock" className="w-6 h-6" />,
	<TrendingUp key="trending" className="w-6 h-6" />,
];
