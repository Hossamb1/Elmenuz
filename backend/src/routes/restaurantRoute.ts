import { restaurantController } from "../controllers/restaurantController";
import express from "express";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string."),
  restaurantController.searchRestaurant
);

export default router;
