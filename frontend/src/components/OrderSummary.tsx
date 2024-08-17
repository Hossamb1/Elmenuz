import { Separator } from "./ui/separator";
import { CartItem } from "../pages/DetailPage";
import { MenuItem, Restaurant } from "../types";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (menuItem: MenuItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return totalInPence ? (totalWithDelivery / 100).toFixed(2) : 0;
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your order</span>
          <span>E£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <>
            {item.quantity > 0 && (
              <div className="flex justify-between">
                <span>
                  <Badge variant="outline" className="mr-2">
                    {item.quantity}
                  </Badge>
                  {item.name}
                </span>
                <div className="flex items-center justify-between min-w-16 gap-2">
                  <Trash
                    className="cursor-pointer"
                    size={20}
                    color="red"
                    onClick={() => removeFromCart(item)}
                  />{" "}
                  <span className="flex items-center ">
                    {((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
        <Separator />
        {getTotalCost() ? (
          <>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span> {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
            </div>
            <Separator />
          </>
        ) : (
          ""
        )}
      </CardContent>
    </>
  );
};

export default OrderSummary;
