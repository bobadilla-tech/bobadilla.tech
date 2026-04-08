import type { SVGProps } from "react";
import { siGithub, siLinkedin, siInstagram, siX } from "simple-icons";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function SimpleIcon({
	icon,
	size = 24,
	className,
	...props
}: IconProps & { icon: { path: string } }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			{...props}
		>
			<path d={icon.path} />
		</svg>
	);
}

export function Github(props: IconProps) {
	return <SimpleIcon icon={siGithub} {...props} />;
}

export function Linkedin(props: IconProps) {
	return <SimpleIcon icon={siLinkedin} {...props} />;
}

export function Instagram(props: IconProps) {
	return <SimpleIcon icon={siInstagram} {...props} />;
}

export function Twitter(props: IconProps) {
	return <SimpleIcon icon={siX} {...props} />;
}
