import mongoose from "mongoose";
export default function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("connected to the database!"))
    .catch((err) => console.log(err));
}
