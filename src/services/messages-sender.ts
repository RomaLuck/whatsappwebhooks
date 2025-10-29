import {Image} from "../types";
import {apiClient} from "./api-client";
import {MessageTypes} from "./message-types";
import {IInteractive} from "../dto/i-interactive";

export const replyMessage = async (
	to: string,
	body: string,
	messageId: string
): Promise<void> => {
	await apiClient.post("/", {
			messaging_product: "whatsapp",
			to,
			type: MessageTypes.TEXT.valueOf(),
			text: {body},
			context: {
				message_id: messageId,
			}
		},
	);
	console.log(`Sending message to ${to}: ${body}`);
}

export const sendTextMessage = async (
	to: string,
	body: string
): Promise<void> => {
	await apiClient.post("/", {
			messaging_product: "whatsapp",
			to,
			type: MessageTypes.TEXT.valueOf(),
			text: {body},
		},
	);
	console.log(`Sending message to ${to}: ${body}`);
}

export const sendImageMessage = async (
	to: string,
	image: Image
): Promise<void> => {
	await apiClient.post("/", {
		messaging_product: "whatsapp",
		to,
		type: MessageTypes.IMAGE.valueOf(),
		image: {
			link: image.link,
			...(image.caption ? {caption: image.caption} : {}),
		},
	});
	console.log(`Sending image to ${to}: ${image.link}${image.caption ? ` (caption: ${image.caption})` : ""}`);
}

export const sendInteractiveMessage = async (
	to: string,
	interactive: IInteractive
): Promise<void> => {
	await apiClient.post("/", {
		messaging_product: "whatsapp",
		to,
		type: MessageTypes.INTERACTIVE.valueOf(),
		interactive
	});
}
