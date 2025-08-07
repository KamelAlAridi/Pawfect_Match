import express from "express";
import {
  addpet,
  getPets,
  getPetById,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  isPetFavorite,
} from "../controllers/petController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addpet", upload.single("photo"), addpet);
router.get("/getpets", getPets);
router.get("/getpetbyid/:id", getPetById);
router.post("/addtofavorites", addToFavorites);
router.get("/getfavorites/:userId", getFavorites);
router.post("/removefromfavorites", removeFromFavorites);
router.get("/isfavorite/:petId/:userId", isPetFavorite);

export default router;
