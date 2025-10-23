import axios from "axios";
import {WHATSAPP_API_TOKEN, WHATSAPP_API_URL} from "../secrets";

export const apiClient = axios.create({
	baseURL: WHATSAPP_API_URL,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${WHATSAPP_API_TOKEN}`,
	},
});
