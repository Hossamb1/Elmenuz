import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useGetMyOrders } from "../api/OrderApi";
import OrderStatusDetail from "../components/orderStatusDetail";
import OrderStatusHeader from "../components/orderStatusHeader";
import EmptyOrders from "../assets/EmptyOrders.svg";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Loader from "../components/loader";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <Loader />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="gap-3 flex flex-col text-center justify-center ">
        <h1 className="text-5xl font-bold">My orders</h1>
        <img src={EmptyOrders} alt="" className="h-40 my-6" />
        <p className="text-2xl font-medium">
          You're missing out! You haven't placed any orders yet
        </p>
        <p className="text-gray-500 mb-10 text-sm">
          Discover the best dishes around you and place your first order now
        </p>
        <Link to="/search/all">
          <Button className="bg-orange-500">
            Discover new restaurants now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="text-5xl text-center font-bold">My orders</h1>
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
