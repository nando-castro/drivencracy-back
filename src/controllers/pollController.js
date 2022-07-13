import joi from "joi";
import { db } from "../db/mongodb.js";
import dotenv from "dotenv";
import daysjs from "dayjs";
import dayjs from "dayjs";
dotenv.config();

export async function registerPoll(req, res) {
  const registerSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.date().min("now"),
  });

  const poll = req.body;

  const { error } = registerSchema.validate(poll);

  if (error) {
    return res.status(422).send(`"Não está no formato correto" ${error}`);
  }

  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ title: poll.title });

    if (pollExists) {
      return res.status(401).send("Poll exists!!");
    }
  } catch (error) {
    res.sendStatus(500);
  }

  if (!poll.expireAt || poll.expireAt === "") {
    const dt = daysjs().add(30, "day").format("YYYY-MM-DD 23:59");

    await db.collection("polls").insertOne({
      title: poll.title,
      expireAt: dt,
    });

    return res.status(201).send("data add automaticamente");
  }
  try {
    await db.collection("polls").insertOne({
      title: poll.title,
      expireAt: poll.expireAt,
    });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
