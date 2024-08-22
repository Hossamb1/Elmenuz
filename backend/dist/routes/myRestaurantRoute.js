"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const restaurantController_1 = require("../controllers/restaurantController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    },
});
router.get("/order", auth_1.jwtCheck, auth_1.jwtparse, restaurantController_1.restaurantController.getMyRestaurantOrders);
router.get("/", auth_1.jwtCheck, auth_1.jwtparse, restaurantController_1.restaurantController.getMyRestaurant);
router.patch("/order/:orderId/status", auth_1.jwtCheck, auth_1.jwtparse, restaurantController_1.restaurantController.updateOrderStatus);
router.post("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtparse, restaurantController_1.restaurantController.createMyRestaurant);
router.put("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtparse, restaurantController_1.restaurantController.updateMyRestaurant);
exports.default = router;
