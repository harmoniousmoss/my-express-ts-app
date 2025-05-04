import { Router } from "express";
import { postContactController } from "../controllers/contact/postContactController";
import { getAllContactsController } from "../controllers/contact/getAllContactsController";

const router = Router();

router.post("/", postContactController);
router.get("/", getAllContactsController);

export default router;
