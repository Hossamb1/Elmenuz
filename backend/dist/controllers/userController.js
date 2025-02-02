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
const user_1 = __importDefault(require("../models/user"));
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = yield user_1.default.findOne({ _id: req.userId });
            if (!currentUser) {
                res.status(404).json("User not found");
            }
            res.json(currentUser);
        }
        catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    });
}
function createCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const auth0Id = req.body;
            const existingUser = yield user_1.default.findOne(auth0Id);
            if (existingUser) {
                return res.status(200).send(existingUser);
            }
            const newUser = new user_1.default(req.body);
            console.log(newUser);
            yield newUser.save();
            res.status(201).json(newUser.toObject());
        }
        catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
        }
    });
}
function updateCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, addressLine1, country, city } = req.body;
            const user = yield user_1.default.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.name = name;
            user.addressLine1 = addressLine1;
            user.country = country;
            user.city = city;
            yield user.save();
            res.send(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json("Something went wrong");
        }
    });
}
exports.default = {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};
