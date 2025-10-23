import {Request, Response} from "express";
import {VERIFY_TOKEN} from "../secrets";
import {Bot} from "../services/bot";
import serviceRouter from "../services/service-router";

export const ping = (_req: Request, res: Response): Response => {
	return res.status(200).json({message: "Hello from the server!"});
};

export const subscribe = (req: Request, res: Response): Response => {
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];
	if (mode === "subscribe" && token === VERIFY_TOKEN) {
		return res.status(200).send(challenge);
	} else {
		return res.sendStatus(403);
	}
};

export const process = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const {entry} = req.body;
	if (!entry || entry.length === 0) {
		return res.sendStatus(400);
	}
	const changes = entry[0].changes;
	if (!changes || changes.length === 0) {
		return res.sendStatus(400);
	}
	const value = changes[0].value;
	if (!value) {
		return res.sendStatus(400);
	}

	const message = value.messages?.[0] ?? null;
	const status = value.statuses?.[0] ?? null;

	if (status) {
		const statusId = status.id;
		const statusStatus = status.status;
		console.log(`Message status: ID ${statusId} is now ${statusStatus}`);
	}

	if (message) {
		const bot = new Bot(message);
		try {
			serviceRouter.apply(bot);
			await bot.run();
		} catch (e) {
			console.error("Bot processing failed:", e);
		}
		console.log(JSON.stringify(message, null, 2));
	}

	if (!message && !status) {
		return res.status(200).send("No actionable data");
	}

	return res.status(200).send("Webhook processed");
};
