import express from "express";
import multer from "multer";
import { restaurantController } from "../controllers/restaurantController";
import { jwtCheck, jwtparse } from "../middleware/auth";
import { validatedMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

router.get("/", jwtCheck, jwtparse, restaurantController.getMyRestaurant);
router.post(
  "/",
  upload.single("imageFile"),
  validatedMyRestaurantRequest,
  jwtCheck,
  jwtparse,
  restaurantController.createMyRestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validatedMyRestaurantRequest,
  jwtCheck,
  jwtparse,
  restaurantController.updateMyRestaurant
);

export default router;