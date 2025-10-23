import { Router } from "express";
import { ping, process, subscribe } from "../controllers";

const router: Router = Router();

router.get("/", ping);
router.get("/webhook", subscribe);
router.post("/webhook", process);

export default router;
