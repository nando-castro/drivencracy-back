import { Router } from "express";
import {
  getPoll,
  getResult,
  registerPoll,
} from "../controllers/pollController.js";
import pollvalidate from "../middlewares/validadePoll.js";

const router = Router();

router.post("/poll", pollvalidate, registerPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/result", getResult);

export default router;
