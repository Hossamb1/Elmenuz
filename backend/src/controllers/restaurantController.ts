import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import { Request, Response } from "express";
import mongoose from "mongoose";

// Check if the servers on vercel see the console.log() as a feedback

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    let query: any = {};

    query["city"] = new RegExp(city, "i");

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisines) => new RegExp(cuisines, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    if (city === "all") {
      let restaurants;
      let total;
      if (searchQuery || selectedCuisines) {
        delete query.city;
        restaurants = await Restaurant.find(query)
          .sort({ [sortOption]: 1 })
          .skip(skip)
          .limit(pageSize)
          .lean();
        total = await Restaurant.countDocuments(query);
      } else {
        restaurants = await Restaurant.find()
          .sort({ [sortOption]: 1 })
          .skip(skip)
          .limit(pageSize)
          .lean();
        total = await Restaurant.countDocuments();
      }

      if (total === 0) {
        return res.status(204).json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 10,
          },
        });
      }

      const response = {
        data: restaurants,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };

      return res.json(response);
    }

    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(204).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 10,
        },
      });
    }

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "cannot update restaurant" });
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({
        message: "User restaurant already exists",
      });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save();

    return res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export const restaurantController = {
  updateMyRestaurant,
  createMyRestaurant,
  getMyRestaurant,
  searchRestaurant,
  getRestaurant,
};
