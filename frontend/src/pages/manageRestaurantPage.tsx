import { useNavigate } from "react-router-dom";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "../api/myRestaurantApi";
import ManageRestaurantForm from "../forms/UserProfileForm/ManageRestaurantForm/manageRestaurantForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import OrderItemCard from "../components/OrderItemCard";

function ManageRestaurantPage() {
  const {
    createRestaurant,
    isLoading: isLoadingCreate,
    isSuccess,
  } = useCreateMyRestaurant();
  const { getRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const { orders, isLoading } = useGetMyRestaurantOrders();

  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
    window.scrollTo(0, 0);
  }

  const isEditing = !!getRestaurant;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {isLoading ? (
            <>Loading orders...</>
          ) : (
            <>{orders?.length} active orders</>
          )}
        </h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isEditing ? isLoadingUpdate : isLoadingCreate}
          restaurant={getRestaurant}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ManageRestaurantPage;
