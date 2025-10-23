import {replyMessage} from "./services/messages-sender";
import serviceRouter from "./services/service-router";
import {helloWorldHandler} from "./handlers/hello-world-handler";

serviceRouter.onText('start', helloWorldHandler);

serviceRouter.onText('help', async (bot) => {
	await replyMessage(bot.getMessage().from, "Help", bot.getMessage().id);
});