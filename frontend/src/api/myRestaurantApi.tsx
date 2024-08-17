import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const UpdateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      config
    );

    if (!response) {
      throw new Error("Failed to reach the server");
    }

    return response.data;
  };

  const {
    mutateAsync: updateRestaurant,
    isSuccess,
    isError,
    isLoading,
  } = useMutation(UpdateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }
  if (isError) {
    toast.error("Unable to update restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/my/restaurant`,
      config
    );

    if (!response) {
      throw new Error("Cannot get restaurant");
    }
    return response.data;
  };
  const { data: getRestaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return {
    getRestaurant,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const Response = await axios.post(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      config
    );

    if (!Response) {
      throw new Error("Failed to create restaurant");
    }
    return Response.data;
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (isError) {
    toast.error("Unable to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
    isSuccess,
  };
};
