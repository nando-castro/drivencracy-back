import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRouter from "./routes/pollRoutes.js";
import choiceRouter from "./routes/choiceRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(pollRouter);
app.use(choiceRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT} `);
});
