"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function connectDb() {
    mongoose_1.default
        .connect(process.env.MONGO_URI)
        .then(() => console.log("connected to the database!"))
        .catch((err) => console.log(err));
}
exports.default = connectDb;
