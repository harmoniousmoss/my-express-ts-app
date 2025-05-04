import { Document } from "mongodb";

export interface Contact extends Document {
  fullName: string;
  emailAddress: string;
  organization?: string;
  phoneNumber?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
