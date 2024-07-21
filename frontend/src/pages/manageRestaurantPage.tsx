import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/myRestaurantApi";
import ManageRestaurantForm from "../forms/UserProfileForm/ManageRestaurantForm/manageRestaurantForm";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isLoadingCreate } =
    useCreateMyRestaurant();
  const { getRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isLoadingUpdate } =
    useUpdateMyRestaurant();

  const isEditing = !!getRestaurant;
  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isEditing ? isLoadingUpdate : isLoadingCreate}
      restaurant={getRestaurant}
    />
  );
}

export default ManageRestaurantPage;
