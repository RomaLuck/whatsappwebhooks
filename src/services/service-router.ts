import {Handler, TextMatcher} from "../types";

export class ServiceRouter {
	textHandlers: { matcher: TextMatcher; handler: Handler }[] = [];
	commandHandlers: { command: string; handler: Handler }[] = [];
	imageHandlers: Handler[] = [];
	videoHandlers: Handler[] = [];
	audioHandlers: Handler[] = [];
	documentHandlers: Handler[] = [];
	fallbackHandler: Handler | null = null;

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
}

export default new ServiceRouter();
