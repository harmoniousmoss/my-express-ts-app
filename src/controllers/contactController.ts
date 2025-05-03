// src/controllers/contactController.ts
import { RequestHandler } from "express";
import { getCollection } from "../config/mongodb";

export const createContact: RequestHandler = async (req, res, next) => {
  console.log("[POST /api/v1/contacts] Body:", req.body);

  const { fullName, emailAddress, organization, phoneNumber, message } =
    req.body;
  if (!fullName || !emailAddress || !message) {
    res
      .status(400)
      .json({ error: "fullName, emailAddress, and message are required." });
    return;
  }

  const createdAt = new Date();
  const updatedAt = createdAt;
  const contacts = getCollection("contacts");

  try {
    const result = await contacts.insertOne({
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      message,
      createdAt,
      updatedAt,
    });

    // turn the ObjectId into a string:
    const id = result.insertedId.toHexString();

    // build exactly the shape you want to return
    const responsePayload = {
      id,
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      message,
      createdAt,
      updatedAt,
    };

    console.log("[POST /api/v1/contacts] Response:", responsePayload);
    res.status(201).json(responsePayload);
  } catch (err) {
    console.error("[POST /api/v1/contacts] Error:", err);
    next(err);
  }
};
