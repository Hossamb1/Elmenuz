"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtparse, orderController_1.default.getMyOrders);
router.post("/checkout/create-checkout-session", auth_1.jwtCheck, auth_1.jwtparse, orderController_1.default.createCheckoutSession);
router.post("/checkout/webhook", orderController_1.default.stripeWebhookHandler);
exports.default = router;
