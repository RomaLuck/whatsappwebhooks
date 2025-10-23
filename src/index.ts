import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes";
import "./router"; // register serviceRouter handlers at startup

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
