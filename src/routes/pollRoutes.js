import { Router } from "express";
import { getChoice, registerChoice, registerVote } from "../controllers/choiceController.js";
import { getPoll, getResult, registerPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/poll", registerPoll);
router.post("/choice", registerChoice);
router.post("/choice/:id/vote", registerVote);

router.get("/poll", getPoll);
router.get("/poll/:id/choice", getChoice);
router.get("/poll/:id/result", getResult);
//router.get("/result/:id", getResult);
//router.get("/result", getResult);

export default router;
