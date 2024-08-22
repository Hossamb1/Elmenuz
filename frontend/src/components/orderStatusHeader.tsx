import { useEffect, useState } from "react";
import { Order } from "../types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "../config/orderStatus";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const [progress, setProgress] = useState(0);

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) ||
      ORDER_STATUS[0]
    );
  };

  useEffect(() => {
    setProgress(getOrderStatusInfo().progressValue);

    // Adjust the delay to control the speed of the progress
  }, [order.status]);

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="ease-in-out animate-pulse delay-1000"
        value={progress}
      />
    </>
  );
};

export default OrderStatusHeader;
