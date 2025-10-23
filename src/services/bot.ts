import {Handler, Message, TextMatcher} from "../types";

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

		if (type === "text" && this.message.text?.body) {
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
		} else if (type === "image") {
			for (const h of this.imageHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === "video") {
			for (const h of this.videoHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === "audio") {
			for (const h of this.audioHandlers) {
				await h(this);
				handled = true;
			}
		} else if (type === "document") {
			for (const h of this.documentHandlers) {
				await h(this);
				handled = true;
			}
		}

		if (!handled && this.fallbackHandler) {
			await this.fallbackHandler(this);
		}
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