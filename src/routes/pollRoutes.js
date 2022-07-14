import { Router } from "express";
import { getChoice, registerChoice, registerVote } from "../controllers/choiceController.js";
import { getPoll, registerPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/poll", registerPoll);
router.post("/choice", registerChoice);
router.post("/choice/:id/vote", registerVote);

router.get("/poll", getPoll);
router.get("/poll/:id/choice", getChoice);

export default router;
