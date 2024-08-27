import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/searchApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import { useState } from "react";
import SearchBar, { searchForm } from "../components/searchBar";

import PaginationSelector from "../components/PaginationSelector";
import CuisineFilter from "../components/cuisineFilter";
import SortOptionDropdown from "../components/SortOptionDropdown";
import Loader from "../components/loader";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading, isError } = useSearchRestaurants(
    searchState,
    city
  );

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      page: 1,
      selectedCuisines,
    }));
  };

  const setSearchQuery = (searchFormData: searchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!city || isError) {
    return <div>no results found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeHolder="Search by cuisine or restaurant name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />

        {results?.data ? (
          <>
            <div className="flex justify-between flex-col gap-3 lg:flex-row">
              <SearchResultInfo total={results.pagination.total} city={city} />
              <SortOptionDropdown
                onChange={setSortOption}
                sortOption={searchState.sortOption}
              />
            </div>
            {results.data.map((restaurant) => (
              <SearchResultCard restaurant={restaurant} key={restaurant._id} />
            ))}
            <PaginationSelector
              page={results.pagination.page}
              pages={results.pagination.pages}
              onPageChange={setPage}
            />
          </>
        ) : (
          <h1 className="text-xl font-bold">No restaurants found</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
