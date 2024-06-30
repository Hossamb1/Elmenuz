import express from "express";
import userController from "../controllers/userController";
import { jwtCheck, jwtparse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.get("/", jwtCheck, jwtparse, userController.getCurrentUser);
router.post("/", jwtCheck, userController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtparse,
  validateMyUserRequest,
  userController.updateCurrentUser
);

export default router;
