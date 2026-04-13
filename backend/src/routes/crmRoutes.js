import express from "express";
import { createEntity, deleteEntity, listEntities, updateEntity } from "../controllers/crmController.js";
import { protect } from "../middleware/auth.js";
import { Contact } from "../models/Contact.js";
import { Deal } from "../models/Deal.js";
import { Lead } from "../models/Lead.js";

const router = express.Router();

router.use(protect);

router.route("/leads").get(listEntities(Lead)).post(createEntity(Lead, "lead"));
router.route("/leads/:id").put(updateEntity(Lead, "lead")).delete(deleteEntity(Lead, "lead"));

router.route("/contacts").get(listEntities(Contact)).post(createEntity(Contact, "contact"));
router.route("/contacts/:id").put(updateEntity(Contact, "contact")).delete(deleteEntity(Contact, "contact"));

router.route("/deals").get(listEntities(Deal, "contactId")).post(createEntity(Deal, "deal"));
router.route("/deals/:id").put(updateEntity(Deal, "deal")).delete(deleteEntity(Deal, "deal"));

export default router;
