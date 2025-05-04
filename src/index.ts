import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/mongodb";
import contactRoutes from "./routes/contactRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the API – everything is up and running!");
});

app.use("/api/v1/contacts", contactRoutes);

async function start() {
  await connectToDatabase();
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("❌ Server failed to start", err);
  process.exit(1);
});
