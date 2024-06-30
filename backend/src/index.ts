import express, { Request, Response } from "express";
import { jwtCheck } from "./middleware/auth";
import cors from "cors";
import "dotenv/config";
import connectDb from "./lib/db";
import myUserRoutes from "./routes/myUserRoutes";

const app = express();

// connect to db
connectDb();

// Adding middleware
app.use(express.json());

// allowing all cors
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});
app.get("/health", async (req: Request, res: Response) => {
  res.json({ message: "Health OK!" });
});

app.use("/api/my/user", myUserRoutes);

app.listen(5000, () => {
  console.log("server started on: 5000");
});
