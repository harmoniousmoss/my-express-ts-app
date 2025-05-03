import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDatabase } from "./config/mongodb";
import contactRoutes from "./routes/contactRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/contacts", contactRoutes);

async function start() {
  await connectToDatabase();
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`🚀  Server listening on http://localhost:${port}`)
  );
}

start().catch((err) => {
  console.error("❌  Server failed to start", err);
  process.exit(1);
});
