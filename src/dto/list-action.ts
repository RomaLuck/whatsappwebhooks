import {Section} from "./section";

export class ListAction {
	button: string;
	sections: Section[];

	constructor(button: string, sections: Section[]) {
		this.button = button;
		this.sections = sections;
	}
}