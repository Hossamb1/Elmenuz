"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = __importDefault(require("./lib/db"));
const myUserRoutes_1 = __importDefault(require("./routes/myUserRoutes"));
const cloudinary_1 = require("cloudinary");
const myRestaurantRoute_1 = __importDefault(require("./routes/myRestaurantRoute"));
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
// connect to db
(0, db_1.default)();
// connect to cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// allowing all cors
app.use((0, cors_1.default)());
// server check
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hello!" });
}));
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
// adding middleware
app.use(express_1.default.json());
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Health OK!" });
}));
app.use("/api/my/user", myUserRoutes_1.default);
app.use("/api/my/restaurant", myRestaurantRoute_1.default);
app.use("/api/restaurant", restaurantRoute_1.default);
app.use("/api/order", orderRoute_1.default);
app.listen(5000, () => {
    console.log("server started on: 5000");
});
