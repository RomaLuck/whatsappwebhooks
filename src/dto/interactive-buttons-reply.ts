import {MessageTypes} from "../services/message-types";
import {ButtonAction} from "./button-action";
import {IInteractive} from "./i-interactive";

export class InteractiveButtonsReply implements IInteractive{
	type: string;
	header?: string;
	body: { text: string; };
	footer?: { text: string; };
	action: ButtonAction;

	constructor(action: ButtonAction, body: string) {
		this.type = MessageTypes.BUTTON.valueOf();
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