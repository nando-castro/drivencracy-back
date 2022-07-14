import choiceSchema from "../schemas/choiceSchemas/choiceSchema.js";

export default async function validateChoice(req, res, next) {
  const { error } = choiceSchema.validate(req.body);

  if (error) {
    return res.sendStatus(422);
  }

  next();
}
