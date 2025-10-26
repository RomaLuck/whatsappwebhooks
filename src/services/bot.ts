import {Handler, Message, TextMatcher} from "../types";
import {MessageTypes} from "./message-types";

export class Bot {
	private textHandlers: { matcher: TextMatcher; handler: Handler }[] = [];
	private commandHandlers: { command: string; handler: Handler }[] = [];
	private imageHandlers: Handler[] = [];
	private videoHandlers: Handler[] = [];
	private audioHandlers: Handler[] = [];
	private documentHandlers: Handler[] = [];
	private fallbackHandler: Handler | null = null;

	constructor(private message: Message) {
	}

	public async run(): Promise<void> {
		let handled = false;
		const {type} = this.message;

		if (type === MessageTypes.TEXT.valueOf() && this.message.text?.body) {
			const text = this.message.text.body;
			if (text.startsWith("/")) {
				const [cmd] = text.slice(1).trim().split(/\s+/);
				for (const {command, handler} of this.commandHandlers) {
					if (cmd.toLowerCase() === command.toLowerCase()) {
						await handler(this);
						handled = true;
					}
				}
			}
			handled = await this.handleText(text, handled);
		} else if (type === MessageTypes.IMAGE.valueOf()) {
			for (const h of this.imageHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.VIDEO.valueOf()) {
			for (const h of this.videoHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.AUDIO.valueOf()) {
			for (const h of this.audioHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.DOCUMENT.valueOf()) {
			for (const h of this.documentHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === MessageTypes.INTERACTIVE.valueOf()) {
			const interactive = this.message.interactive;
			if (interactive?.type === "button_reply" && interactive.button_reply?.id) {
				const text = interactive.button_reply.id;
				handled = await this.handleText(text, handled);
			}
		}

		if (!handled && this.fallbackHandler) {
			await this.fallbackHandler(this);
		}
	}

	private async handleText(text: string, handled: boolean) {
		for (const {matcher, handler} of this.textHandlers) {
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

	public onText(message: TextMatcher, callback: Handler): this {
		this.textHandlers.push({matcher: message, handler: callback});
		return this;
	}

	public onCommand(command: string, callback: Handler): this {
		this.commandHandlers.push({command, handler: callback});
		return this;
	}

	public onImage(callback: Handler): this {
		this.imageHandlers.push(callback);
		return this;
	}

	public onVideo(callback: Handler): this {
		this.videoHandlers.push(callback);
		return this;
	}

	public onAudio(callback: Handler): this {
		this.audioHandlers.push(callback);
		return this;
	}

	public onDocument(callback: Handler): this {
		this.documentHandlers.push(callback);
		return this;
	}

	public fallback(callback: Handler): this {
		this.fallbackHandler = callback;
		return this;
	}
}