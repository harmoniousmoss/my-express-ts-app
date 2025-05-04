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

  try {
    const contacts = getCollection("contacts");
    const result = await contacts.insertOne({
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      message,
      createdAt,
      updatedAt,
    });

    const id = result.insertedId.toHexString();
    const responsePayload = {
      id,
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      createdAt,
      updatedAt,
      message: "I've received your message and will get back to you shortly.",
    };

    console.log("[POST /api/v1/contacts] Response:", responsePayload);
    res.status(201).json(responsePayload);
  } catch (err) {
    console.error("[POST /api/v1/contacts] Error:", err);
    next(err);
  }
};
