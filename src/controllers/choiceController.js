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

export async function getChoice(req, res) {
  const { id } = req.params;

  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: objectId(id) });
    if (!pollExists) {
      return res.status(404).send("enquente não existe ");
    }
    const choices = await db.collection("choices").find({poolId: id}).toArray();
    res.status(200).send(choices);
  } catch (error) {
    console.log(error);
    res.status(500).send(`${error}`);
  }
}

export async function registerVote(req, res) {
  const { id } = req.params;

  try {
    const choiceExists = await db
      .collection("choices")
      .findOne({ _id: objectId(id) });
    if (!choiceExists) {
      return res.status(404).send("opção não existe!");
    }
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: objectId(choiceExists.poolId) });

    if (pollExists.expireAt < dayjs().format("YYYY-MM-DD HH:mm")) {
      return res.status(403).send("enquente expirada!!");
    }
    await db.collection("votes").insertOne({
      createAt: dayjs().format("YYYY-MM-DD HH:mm"),
      choiceId: objectId(id),
    });
    res.status(201).send("Opção registrada!");
  } catch (error) {}
}
