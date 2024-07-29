import axios from "axios";
import { useQuery } from "react-query";
import { RestaurantSearchResponse } from "../types";
import { SearchState } from "../pages/searchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    console.log(params.toString());

    const response = await axios.get(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    console.log(response);
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

export default { useSearchRestaurants };
