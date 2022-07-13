import { Router } from "express";
import { getChoice, registerChoice } from "../controllers/choiceController.js";
import { getPoll, registerPoll } from "../controllers/pollController.js";

const router = Router();

router.post("/poll", registerPoll);
router.post("/choice", registerChoice);

router.get("/poll", getPoll);
router.get("/choice/:id", getChoice);

export default router;
