import express from "express";
import {
  requestCode,
  signup,
  signin,
  isUserCreated,
  updateName,
  updatePassword,
  deleteAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/request-code", requestCode);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/isUserCreated", isUserCreated);
router.put("/update-name", updateName);
router.put("/update-password", updatePassword);
router.delete("/delete-account", deleteAccount);

export default router;
