import {sendTextMessage} from "../services/messages-sender";
import {Handler} from "../types";

export const helloWorldHandler: Handler = async (bot) => {
	await sendTextMessage(bot.getMessage().from, "Hello, world!");
}