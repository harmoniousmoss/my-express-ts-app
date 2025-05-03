// src/index.ts

import express, { Request, Response } from "express";

// Create an Express application
const app = express();

// Middleware to parse JSON bodies (not strictly needed here, but useful later)
app.use(express.json());

// Define a GET handler for the root path
app.get("/", (req: Request, res: Response) => {
  res.send("Hello typescript with TS");
});

// Determine port (default 3000)
const PORT = process.env.PORT ?? 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
