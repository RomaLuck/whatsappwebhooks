export type Image = {
	link: string;
	caption?: string;
};

export type Message = {
	id: string;
	type: string;
	text?: {
		body: string;
	};
	images?: Image[];
	from: string;
}


export type BotLike = { getMessage(): Message };

export type TextMatcher = string | RegExp | ((text: string, bot: BotLike) => boolean);

export type Handler = (bot: BotLike) => void | Promise<void>;