import pollSchema from "../schemas/pollSchemas/pollSchema.js";

export default async function validatePoll(req, res, next) {
  const { error } = pollSchema.validate(req.body);

  if (error) {
    return res.status(422).send(`"Não está no formato correto" ${error}`);
  }
  next();
}
