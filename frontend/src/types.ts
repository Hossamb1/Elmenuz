export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered"
  | "cancelled";
export type Order = {
  _id: string;
  restaurant: Restaurant;
  User: User;
  deliveryDetails: {
    name: string;
    email: string;
    addressLine1: string;
    city: string;
  };
  cartItems: { menuItemId: string; name: string; quantity: string }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
