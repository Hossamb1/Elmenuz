import { jwtCheck, jwtparse } from "../middleware/auth";
import orderController from "../controllers/orderController";
import express from "express";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtparse,
  orderController.createCheckoutSession
);

router.post("/checkout/webhook", orderController.stripeWebhookHandler);

export default router;
