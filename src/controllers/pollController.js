import joi from "joi";
import { db } from "../db/mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function registerPoll(req, res) {
  const registerSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.date().greater("now"),
  });

  const poll = req.body;

  const { error } = registerSchema(poll);

  if (error) {
    return res.status(422).send("Não está no formato correto");
  }

  if (poll.expireAt === "") {
    const time = new Date();
    const outraData = new Date();
    outraData.setDate(time.getDate() + 3);

    Date.prototype.addDays = function (days) {
      this.setDate(this.getDate() + days);
    };

    const dt = new Date();

    poll.expireAt === dt;
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
