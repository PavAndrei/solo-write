import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./src/routes/auth";
import { globalErrorHandler } from "./src/middlewares/globalErrorHandler";

dotenv.config();

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || "";
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("❌ MONGO_CONNECTION_STRING is missing");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ DB is connected successfully!"))
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });

const app: Application = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);
