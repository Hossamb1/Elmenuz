import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "../types";

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

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${API_BASE_URL}/api/my/restaurant/order`,
      config
    );

    if (!response) {
      throw new Error("Failed to fetch orders");
    }
    return response.data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return {
    orders,
    isLoading,
  };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      { status: updateStatusOrderRequest.status },
      config
    );

    if (!response) {
      throw new Error("Failed to update status");
    }

    return response;
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }
  return { updateRestaurantStatus, isLoading };
};
