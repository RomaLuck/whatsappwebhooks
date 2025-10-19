import axios from "axios";

export const sendMessage = async (to: string, message: string) => {
  await axios.post(
    process.env.WHATSAPP_API_URL!,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      },
    }
  );
  console.log(`Sending message to ${to}: ${message}`);
};
