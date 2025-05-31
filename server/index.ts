import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./src/routes/auth";

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

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
