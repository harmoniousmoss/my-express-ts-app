import { RequestHandler } from "express";
import { getCollection } from "../../config/mongodb";
import { Contact } from "../../models/contact/contact";

export const getAllContactsController: RequestHandler = async (
  _req,
  res,
  next
) => {
  try {
    const contacts = getCollection<Contact>("contacts");
    const all = await contacts.find().toArray();
    res.json(all);
  } catch (err) {
    next(err);
  }
};
