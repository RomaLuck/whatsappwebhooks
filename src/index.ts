import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
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
  console.log(req.query);
  if (mode && token === process.env.VERIFY_TOKEN) {
    console.log(challenge);
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req: Request, res: Response) => {
  const body = req.body;
  console.log(JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
