import { Router } from "express";
import { getPoll, registerPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/poll", registerPoll);
router.post("/choice");

router.get("/poll", getPoll);

export default router;
