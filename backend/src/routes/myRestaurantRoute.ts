import express from "express";
import multer from "multer";
import { restaurantController } from "../controllers/restaurantController";
import { jwtCheck, jwtparse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtparse,
  restaurantController.getMyRestaurantOrders
);

router.get("/", jwtCheck, jwtparse, restaurantController.getMyRestaurant);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtparse,
  restaurantController.updateOrderStatus
);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtparse,
  restaurantController.createMyRestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtparse,
  restaurantController.updateMyRestaurant
);

export default router;
