import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { sendMessage } from "./service/messages";
// import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the server!" });
});

app.get("/webhook", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode && token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req: Request, res: Response) => {
  const { entry } = req.body;
  if (!entry || entry.length === 0) {
    res.sendStatus(400);
  }
  const changes = entry[0].changes;
  if (!changes || changes.length === 0) {
    res.sendStatus(400);
  }
  const value = changes[0].value;
  if (!value || !value.messages || value.messages.length === 0) {
    res.sendStatus(400);
  }
  const message = value.messages[0] ?? null;
  const status = value.statuses[0] ?? null;

  if (status) {
    const statusId = status.id;
    const statusStatus = status.status;
    console.log(`Message status: ID ${statusId} is now ${statusStatus}`);
  }

  if (message) {
    if (message.type === "text") {
      if (message.text && message.text.body.toLowerCase() === "hello") {
        sendMessage(message.from, "Hello! How can I help you today?");
      }
    }

    console.log(JSON.stringify(message, null, 2));
  }

  res.status(200).send("Webhook processed");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
