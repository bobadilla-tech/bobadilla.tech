export interface ProjectRequirement {
	id: string;
	name: string;
	basePrice: number;
	description: string;
}

export interface Step {
	id: number;
	title: string;
	description: string;
	options: ProjectRequirement[];
	multiSelect?: boolean;
}

export interface SelectedOption {
	name: string;
	price: number;
	description: string;
}

export interface StepBreakdown {
	stepTitle: string;
	options: SelectedOption[];
	total: number;
}

export type Selections = Record<number, string[]>;
