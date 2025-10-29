export class Section {
	title: string;
	rows: Array<{
		id: string;
		title: string;
		description?: string;
	}>;

	constructor(
		title: string,
		rows: Array<{
			id: string;
			title: string;
			description?: string;
		}>) {
		this.title = title;
		this.rows = rows;
	}
}