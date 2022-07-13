import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRouter from "./src/routes/pollRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(pollRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT} `);
});
