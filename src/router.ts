import serviceRouter from "./services/service-router";
import {helloWorldHandler} from "./handlers/hello-world-handler";
import {sendImageMessage, sendInteractiveMessage} from "./services/messages-sender";
import {MessageTypes} from "./services/message-types";

serviceRouter.onText('start', helloWorldHandler);

serviceRouter.onText('help', async (bot) => {
	await sendImageMessage(bot.getMessage().from, {
		link: "https://cdn.pixabay.com/photo/2022/02/25/10/51/dog-7033959_960_720.jpg",
		caption: "Help",
	})
});

serviceRouter.onCommand('start', async (bot) => {
	await sendInteractiveMessage(
		bot.getMessage().from,
		{
			type: MessageTypes.BUTTON.valueOf(),
			body: {
				text: "Hi"
			},
			action: {
				buttons: [
					{
						type: MessageTypes.REPLY.valueOf(),
						reply: {
							id: "start",
							title: "start"
						}
					},
					{
						type: MessageTypes.REPLY.valueOf(),
						reply: {
							id: "help",
							title: "help"
						}
					},
				]
			}
		}
	)
})