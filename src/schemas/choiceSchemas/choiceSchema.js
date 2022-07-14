import joi from "joi";
const choiceSchema = joi.object({
  title: joi.string().min(1).required(),
  poolId: joi.string().required(),
});

export default choiceSchema;
