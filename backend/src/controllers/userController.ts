import User from "../models/user";
import { Response, Request } from "express";

async function getCurrentUser(req: Request, res: Response) {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      res.status(404).json("User not found");
    }
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

async function createCurrentUser(req: Request, res: Response) {
  try {
    const auth0Id = req.body;
    const existingUser = await User.findOne(auth0Id);

    if (existingUser) {
      return res.status(200).send(existingUser);
    }

    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

async function updateCurrentUser(req: Request, res: Response) {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
}
export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
