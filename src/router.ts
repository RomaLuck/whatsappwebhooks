import {sendTextMessage} from "./services/messages-sender";
import serviceRouter from "./services/service-router";

serviceRouter.onText('start', async (bot) => {
	await sendTextMessage(bot.getMessage().from, "Hello, world!");
});

serviceRouter.onText('help', async (bot) => {
	await sendTextMessage(bot.getMessage().from, "Help");
});