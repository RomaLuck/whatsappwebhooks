import {IInteractive} from "./i-interactive";
import {MessageTypes} from "../services/message-types";
import {ListAction} from "./list-action";

export class InteractiveList implements IInteractive {
	type: string;
	header?: any;
	body: { text: string; };
	footer?: { text: string; }
	action: ListAction;

	constructor(action: ListAction, body: string) {
		this.type = MessageTypes.LIST.valueOf();
		this.body = {text: body};
		this.action = action;
	}

	public setHeader(header: string) {
		this.header = header;
	}

	public setFooter(footer: string) {
		this.footer = {text: footer};
	}
}