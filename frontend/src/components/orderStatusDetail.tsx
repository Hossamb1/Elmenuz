import { Separator } from "./ui/separator";
import { Order } from "../types";

type Props = {
  order: Order;
};

const orderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span> {order.deliveryDetails.name}</span>
        <span>
          {" "}
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="font-bold">Your Order</div>
        <ul>
          {order.cartItems.map((item) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>E£{(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default orderStatusDetail;
