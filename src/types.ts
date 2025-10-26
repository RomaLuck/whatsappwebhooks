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
	interactive?: {
		type: string;
		button_reply?: {
			id: string;
			title: string;
		};
	}
}

export type InteractiveReplyButtons = {
	type: string;
	header?: string;
	body: {
		text: string;
	}
	footer?: {
		text: string;
	}
	action: {
		buttons: Button[];
	}
}

export type Button = {
	type: string;
	reply: {
		id: string;
		title: string;
	}
}

export type InteractiveList = {
	type: string;
	header?: {
		type: string;
		text: string
	};
	body: {
		text: string;
	}
	footer?: {
		text: string;
	}
	action: {
		button: string;
		sections: Section[];
	}
}

export type Section = {
	title: string;
	rows: Array<{
		id: string;
		title: string;
		description?: string;
	}>;
}

export type BotLike = { getMessage(): Message };

export type TextMatcher = string | RegExp | ((text: string, bot: BotLike) => boolean);

export type Handler = (bot: BotLike) => void | Promise<void>;