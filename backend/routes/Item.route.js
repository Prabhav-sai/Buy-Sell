import express from "express";
import { createItem, GetItems ,GetItembyId } from "../controllers/Item.controller.js";

const router = express.Router();

router.get("/", GetItems);

router.get("/:item_id", GetItembyId);

router.post("/", createItem);

export default router;