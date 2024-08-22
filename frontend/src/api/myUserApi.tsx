import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
    const token = await getAccessTokenSilently();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_BASE_URL}/api/my/user`, config);

    if (!response) {
      throw new Error("Failed to get User");
    }
    return response.data;
  };

  const { data: currentUser, isLoading } = useQuery(
    "fetchCurrentUser",
    getMyUserRequest
  );

  return {
    currentUser,
    isLoading,
  };
};

type createUserRequest = {
  auth0Id: string;
  email: string;
};

type updateUserRequest = {
  name: string;
  city: string;
  country: string;
  addressLine1: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: createUserRequest) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/my/user`,
      user,
      config
    );

    if (!response) {
      throw new Error("Failed to create User");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (user: updateUserRequest) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${API_BASE_URL}/api/my/user`,
      user,
      config
    );

    if (!response) {
      throw new Error("Failed to update User");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (isError) {
    toast.error((error as string).toString());
    reset;
  }

  return {
    updateUser,
    isLoading,
  };
};
