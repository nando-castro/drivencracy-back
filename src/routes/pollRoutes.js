import { Router } from "express";
import { registerPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/poll", registerPoll);
router.post("/choice");

router.get("/poll");

export default router;
