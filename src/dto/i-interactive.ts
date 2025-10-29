export interface IInteractive {
	type: string;
	header?: any;
	body: {
		text: string;
	}
	footer?: {
		text: string;
	}
	action: object;
}