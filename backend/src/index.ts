import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./lib/db";
import myUserRoutes from "./routes/myUserRoutes";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoutes from "./routes/myRestaurantRoute";

const app = express();

// connect to db
connectDb();

// connect to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// adding middleware
app.use(express.json());

// allowing all cors
app.use(cors());

// server check
app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});
app.get("/health", async (req: Request, res: Response) => {
  res.json({ message: "Health OK!" });
});

app.use("/api/my/user", myUserRoutes);
app.use("/api/my/restaurant", myRestaurantRoutes);

app.listen(5000, () => {
  console.log("server started on: 5000");
});
