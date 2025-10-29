import serviceRouter from "./services/service-router";
import {helloWorldHandler} from "./handlers/hello-world-handler";
import {sendImageMessage, sendInteractiveMessage} from "./services/messages-sender";
import {Button} from "./dto/button";
import {ButtonAction} from "./dto/button-action";
import {InteractiveButtonsReply} from "./dto/interactive-buttons-reply";
import {ListAction} from "./dto/list-action";
import {Section} from "./dto/section";
import {InteractiveList} from "./dto/interactive-list";

serviceRouter.onText('start', helloWorldHandler);

serviceRouter.onText('help', async (bot): Promise<void> => {
	await sendImageMessage(bot.getMessage().from, {
		link: "https://cdn.pixabay.com/photo/2022/02/25/10/51/dog-7033959_960_720.jpg",
		caption: "Help",
	})
});

serviceRouter.onText('list', async (bot): Promise<void> => {
	const sections: Section[] = [];
	sections.push(new Section('section1', [
		{
			id: "row1",
			title: "row1",
		},
		{
			id: "row2",
			title: "row2",
		}
	]))
	sections.push(new Section('section2', [{
		id: "row1",
		title: "row1",
	}]))

	const action = new ListAction('sections', sections);

	await sendInteractiveMessage(
		bot.getMessage().from,
		new InteractiveList(action, "Hi")
	)
});

serviceRouter.onCommand('start', async (bot): Promise<void> => {
	const buttons = [];
	buttons.push(new Button("start", "start"));
	buttons.push(new Button("help", "help"));

	const action = new ButtonAction(buttons);

	await sendInteractiveMessage(
		bot.getMessage().from,
		new InteractiveButtonsReply(action, "Hi")
	)
})