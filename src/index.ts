import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectToDatabase } from "./config/mongodb";

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello typescript with TS");
});

async function start() {
  try {
    await connectToDatabase(); // initialize MongoDB
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀  Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌  Failed to start server", err);
    process.exit(1);
  }
}

start();
