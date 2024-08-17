import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

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

    console.log(checkoutSessionRequest);
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

export { useCreateCheckoutSession };
