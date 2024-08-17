import { MenuItem } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: (menuItem: MenuItem) => void;
};

const MenuItems = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={() => addToCart(menuItem)}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
        <CardContent className="font-bold">
          E£{(menuItem.price / 100).toFixed(2)}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default MenuItems;
