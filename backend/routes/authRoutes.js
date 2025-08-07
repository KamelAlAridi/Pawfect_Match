import express from "express";
import {
  requestCode,
  signup,
  signin,
  isUserCreated,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/request-code", requestCode);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/isUserCreated", isUserCreated);

export default router;
