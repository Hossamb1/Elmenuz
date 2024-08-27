import { SquareMinus, SquarePlus } from "lucide-react";
import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: (menuItem: MenuItem) => void;
  reduceFromCart: (menuItem: MenuItem) => void;
};

const MenuItems = ({ menuItem, addToCart, reduceFromCart }: Props) => {
  return (
    <Card className="cursor-pointer flex justify-between items-center">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
        <CardContent className="font-bold p-0">
          E£{(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </CardHeader>
      <CardContent className="p-6 gap-2 flex flex-col">
        <SquarePlus
          className="text-green-500"
          onClick={() => addToCart(menuItem)}
        ></SquarePlus>
        <SquareMinus
          className="text-red-500"
          onClick={() => reduceFromCart(menuItem)}
        />
      </CardContent>
    </Card>
  );
};

export default MenuItems;
