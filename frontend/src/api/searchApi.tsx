import axios from "axios";
import { useQuery } from "react-query";
import { Restaurant, RestaurantSearchResponse } from "../types";
import { SearchState } from "../pages/searchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getMyRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await axios.get(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getMyRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return {
    restaurant,
    isLoading,
  };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await axios.get(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response) {
      throw new Error("Couldn't get any restaurants");
    }

    return response.data;
  };

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(["searchRestaurants", searchState], createSearchRequest, {
    enabled: !!city,
  });
  return { results, isLoading, isError };
};

export default { useSearchRestaurants, useGetRestaurant };
