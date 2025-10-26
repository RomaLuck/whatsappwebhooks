import {Message} from "../types";
import {MessageTypes} from "./message-types";
import {ServiceRouter} from "./service-router";

export class Bot {
	constructor(private message: Message) {
	}

	public async run(router: ServiceRouter): Promise<void> {
		let handled = false;
		const {type} = this.message;

		if (type === MessageTypes.TEXT.valueOf() && this.message.text?.body) {
			const text = this.message.text.body;
			if (text.startsWith("/")) {
				const [cmd] = text.slice(1).trim().split(/\s+/);
				for (const {command, handler} of router.commandHandlers) {
					if (cmd.toLowerCase() === command.toLowerCase()) {
						await handler(this);
						handled = true;
					}
				}
			}
			handled = await this.handleText(text, handled, router);
		} else if (type === MessageTypes.IMAGE.valueOf()) {
			for (const h of router.imageHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.VIDEO.valueOf()) {
			for (const h of router.videoHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.AUDIO.valueOf()) {
			for (const h of router.audioHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.DOCUMENT.valueOf()) {
			for (const h of router.documentHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.INTERACTIVE.valueOf()) {
			const interactive = this.message.interactive;
			if (interactive?.type === "button_reply" && interactive.button_reply?.id) {
				const text = interactive.button_reply.id;
				handled = await this.handleText(text, handled, router);
			}
		}

		if (!handled && router.fallbackHandler) {
			await router.fallbackHandler(this);
		}
	}

	private async handleText(text: string, handled: boolean, router: ServiceRouter) {
		for (const {matcher, handler} of router.textHandlers) {
			let match = false;
			if (typeof matcher === "string") match = text === matcher;
			else if (matcher instanceof RegExp) match = matcher.test(text);
			else match = matcher(text, this);
			if (match) {
				await handler(this);
				handled = true;
			}
		}
		return handled;
	}

	public getMessage(): Message {
		return this.message;
	}
}