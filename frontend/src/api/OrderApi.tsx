import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrderRequest = async (): Promise<Order[]> => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/api/order`, config);

    if (!response) {
      throw new Error("Failed to get orders");
    }

    return response.data;
  };
  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrderRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      config
    );

    if (!response) {
      throw new Error("Failed to Checkout");
    }

    return response.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation("Checkout", CreateCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { createCheckoutSession, isLoading };
};

export { useCreateCheckoutSession, useGetMyOrders };
