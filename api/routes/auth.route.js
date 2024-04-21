import express from "express";
import { signin, signup, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)
      .post("/signin", signin)
      .post("/google", google);

export default router;