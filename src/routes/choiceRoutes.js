import { Router } from "express";
import {
  getChoice,
  registerChoice,
  registerVote,
} from "../controllers/choiceController.js";
import validateChoice from "../middlewares/validateChoice.js";

const router = Router();

router.post("/choice", validateChoice, registerChoice);
router.post("/choice/:id/vote", registerVote);
router.get("/poll/:id/choice", getChoice);

export default router;
