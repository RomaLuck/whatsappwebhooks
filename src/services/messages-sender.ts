import {Image} from "../types";
import {apiClient} from "./api-client";

export const replyMessage = async (
	to: string,
	body: string,
	messageId: string
): Promise<void> => {
	await apiClient.post("/", {
			messaging_product: "whatsapp",
			to,
			type: "text",
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
			type: "text",
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
		type: "image",
		image: {
			link: image.link,
			...(image.caption ? { caption: image.caption } : {}),
		},
	});
	console.log(`Sending image to ${to}: ${image.link}${image.caption ? ` (caption: ${image.caption})` : ""}`);
}
