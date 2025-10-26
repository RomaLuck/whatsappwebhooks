import serviceRouter from "./services/service-router";
import {helloWorldHandler} from "./handlers/hello-world-handler";
import {sendImageMessage, sendInteractiveMessage} from "./services/messages-sender";
import {Button} from "./dto/button";
import {ButtonAction} from "./dto/button-action";
import {InteractiveButtonsReply} from "./dto/interactive-buttons-reply";

serviceRouter.onText('start', helloWorldHandler);

serviceRouter.onText('help', async (bot) => {
	await sendImageMessage(bot.getMessage().from, {
		link: "https://cdn.pixabay.com/photo/2022/02/25/10/51/dog-7033959_960_720.jpg",
		caption: "Help",
	})
});

serviceRouter.onCommand('start', async (bot) => {
	const buttons = [];
	buttons.push(new Button("start", "start"));
	buttons.push(new Button("help", "help"));

	const action = new ButtonAction(buttons);

	await sendInteractiveMessage(
		bot.getMessage().from,
		new InteractiveButtonsReply(
			action,
			"Hi"
		)
	)
})