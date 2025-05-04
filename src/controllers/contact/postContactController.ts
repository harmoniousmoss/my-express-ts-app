// src/controller/contact/postContactController.ts
import { RequestHandler } from "express";
import { getCollection } from "../../config/mongodb";
import { Contact } from "../../models/contact/contact";

export const postContactController: RequestHandler = async (req, res, next) => {
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
    const contacts = getCollection<Contact>("contacts");
    const result = await contacts.insertOne({
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      message,
      createdAt,
      updatedAt,
    });

    res.status(201).json({
      id: result.insertedId.toHexString(),
      fullName,
      emailAddress,
      organization,
      phoneNumber,
      createdAt,
      updatedAt,
      message:
        "Thank you! We've received your message and will get back to you shortly.",
    });
    return;
  } catch (err) {
    next(err);
  }
};
