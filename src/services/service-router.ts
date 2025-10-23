import {Bot} from "./bot";
import {Handler, TextMatcher} from "../types";

export class ServiceRouter {
	private textHandlers: { matcher: TextMatcher; handler: Handler }[] = [];
	private commandHandlers: { command: string; handler: Handler }[] = [];
	private imageHandlers: Handler[] = [];
	private videoHandlers: Handler[] = [];
	private audioHandlers: Handler[] = [];
	private documentHandlers: Handler[] = [];
	private fallbackHandler: Handler | null = null;

	public onText(matcher: TextMatcher, handler: Handler): this {
		this.textHandlers.push({matcher, handler});
		return this;
	}

	public onCommand(command: string, handler: Handler): this {
		this.commandHandlers.push({command, handler});
		return this;
	}

	public onImage(handler: Handler): this {
		this.imageHandlers.push(handler);
		return this;
	}

	public onVideo(handler: Handler): this {
		this.videoHandlers.push(handler);
		return this;
	}

	public onAudio(handler: Handler): this {
		this.audioHandlers.push(handler);
		return this;
	}

	public onDocument(handler: Handler): this {
		this.documentHandlers.push(handler);
		return this;
	}

	public fallback(handler: Handler): this {
		this.fallbackHandler = handler;
		return this;
	}

	public apply(bot: Bot): Bot {
		for (const {matcher, handler} of this.textHandlers) bot.onText(matcher, handler);
		for (const {command, handler} of this.commandHandlers) bot.onCommand(command, handler);
		for (const handler of this.imageHandlers) bot.onImage(handler);
		for (const handler of this.videoHandlers) bot.onVideo(handler);
		for (const handler of this.audioHandlers) bot.onAudio(handler);
		for (const handler of this.documentHandlers) bot.onDocument(handler);
		if (this.fallbackHandler) bot.fallback(this.fallbackHandler);
		return bot;
	}
}

export default new ServiceRouter();
