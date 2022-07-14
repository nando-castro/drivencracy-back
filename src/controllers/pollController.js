import { db, objectId } from "../db/mongodb.js";
import dotenv from "dotenv";
import daysjs from "dayjs";
import pollSchema from "../schemas/pollSchemas/pollSchema.js";

dotenv.config();

export async function registerPoll(req, res) {
  const poll = req.body;

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

export async function getPoll(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.send(polls);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getResult(req, res) {
  const { id } = req.params;
  try {
    const pollExists = await db
      .collection("polls")
      .findOne({ _id: objectId(id) });
    if (!pollExists) {
      return res.status(404).send("enquente não existe ");
    }
    const choices = await db
      .collection("votes")
      .aggregate([{ $group: { _id: "$choiceId", count: { $sum: 1 } } }])
      .toArray();
    const arr = choices.sort(function (x, y) {
      return y.count - x.count;
    });
    const choiceTop = await db
      .collection("choices")
      .findOne({ _id: arr[0]._id });

    const infos = {
      _id: choiceTop.poolId,
      title: pollExists.title,
      expireAt: pollExists.expireAt,
      result: { title: choiceTop.title, votes: arr[0].count },
    };

    res.status(200).send(infos);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
}
