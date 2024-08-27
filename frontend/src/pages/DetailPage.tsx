import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/searchApi";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import RestaurantInfo from "../components/restaurantInfo";
import MenuItems from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { MenuItem } from "../types";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/UserProfileForm/userProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";
import Loader from "../components/loader";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const currentCartItem = prevCartItems.find((cartItem) => {
        return cartItem.name === menuItem.name;
      });

      let cart;
      if (currentCartItem) {
        cart = prevCartItems.map((cartItem) => {
          return cartItem.name === menuItem.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      } else {
        cart = [...prevCartItems, { ...menuItem, quantity: 1 }];
      }

      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(cart));
      return [...cart];
    });
  };

  const reduceFromCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const currentCartItem = prevCartItems.find((cartItem) => {
        return cartItem.name === menuItem.name;
      });

      let cart;
      if (currentCartItem) {
        cart = prevCartItems.map((cartItem) => {
          return cartItem.name === menuItem.name && cartItem.quantity >= 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem;
        });
      } else {
        cart = [...prevCartItems];
      }

      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(cart));
      return [...cart];
    });
  };

  const removeFromCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const cart = prevCartItems.filter((cartItem) => {
        return cartItem.name !== menuItem.name;
      });
      return [...cart];
    });
  };

  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        country: userFormData.country,
        city: userFormData.city,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);

    window.location.href = data.url;

    return data;
  };

  if (isLoading || !restaurant) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 ">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-light">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItems
              menuItem={menuItem}
              key={menuItem.price}
              addToCart={addToCart}
              reduceFromCart={reduceFromCart}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
