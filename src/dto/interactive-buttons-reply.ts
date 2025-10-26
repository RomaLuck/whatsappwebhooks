import {MessageTypes} from "../services/message-types";
import {ButtonAction} from "./button-action";

export class InteractiveButtonsReply {
	type: string;
	header?: string;
	body: { text: string; };
	footer?: { text: string; };
	action: ButtonAction;

	constructor(action: ButtonAction, body: string, header?: string, footer?: string) {
		this.type = MessageTypes.BUTTON.valueOf();
		this.header = header;
		this.body = {text: body};
		this.footer = footer ? {text: footer} : undefined;
		this.action = action;
	}
}