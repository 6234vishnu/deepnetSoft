import express from "express";
import { createMenu, getMenuData } from "../controllers/menuController.js";
const menueRouter = express.Router();

menueRouter.post("/createRouter", createMenu);
menueRouter.get("/getMenuData", getMenuData);

export default menueRouter;
