import {MessageTypes} from "../services/message-types";

export class Button {
	type: string;
	reply: {
		id: string;
		title: string;
	};

	constructor(id: string, title: string) {
		this.type = MessageTypes.REPLY.valueOf();
		this.reply = {id, title};
	}
}