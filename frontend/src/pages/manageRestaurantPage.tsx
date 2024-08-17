import { useNavigate } from "react-router-dom";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/myRestaurantApi";
import ManageRestaurantForm from "../forms/UserProfileForm/ManageRestaurantForm/manageRestaurantForm";

function ManageRestaurantPage() {
  const {
    createRestaurant,
    isLoading: isLoadingCreate,
    isSuccess,
  } = useCreateMyRestaurant();
  const { getRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
    window.scrollTo(0, 0);
  }

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
