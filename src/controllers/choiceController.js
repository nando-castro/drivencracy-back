import dayjs from "dayjs";
import { db, objectId } from "../db/mongodb.js";
import joi from "joi";
import dotenv from "dotenv";
dotenv.config();

export async function registerChoice(req, res) {
  const choiceSchema = joi.object({
    title: joi.string().min(1).required(),
    poolId: joi.string().required(),
  });

  const choice = req.body;
  const { error } = choiceSchema.validate(choice);

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const choiceExists = await db
      .collection("choices")
      .findOne({ title: choice.title });

    if (choiceExists) {
      return res.status(409).send("Choice exists!!");
    }
  } catch (error) {
    res.status(500).send(`${error}`);
  }

  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: objectId(choice.poolId) });

    if (!pollExists) {
      return res.status(404).send("Poll not exists!!");
    }
    if (pollExists.expireAt < dayjs().format("YYYY-MM-DD HH:mm")) {
      return res.status(403).send("enquente expirada!!");
    }
  } catch (error) {
    res.status(500).send(`${error}`);
  }

  try {
    await db.collection("choices").insertOne({
      title: choice.title,
      poolId: choice.poolId,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}