import { Link, useNavigate } from "react-router-dom";
import SearchBar, { searchForm } from "../components/searchBar";
import { ArrowRight, Utensils } from "lucide-react";

const MainSection = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues: searchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="home h-[100vh] flex justify-center">
      <div className="flex z-30 justify-center flex-wrap lg:px-32 lg:max-w-[1080px] m-auto pt-32">
        <h1 className="md:text-6xl text-5xl text-center font-bold mb-6 tracking-tight text-white">
          Tuck into a takeaway today.
        </h1>
        <SearchBar
          placeHolder="Search a city or a town"
          onSubmit={handleSearchSubmit}
        />
        <h1 className="text-center md:text-3xl text-2xl font-bold mt-16 px-7 basis-full tracking-tight text-white">
          or explore our restaurants
        </h1>
        <Link to="/search/all" className="flex-1 ">
          <div className="bg-white text-black-500 p-8 items-center rounded-md m-4 flex gap-2">
            <div className="flex-1">
              <h3 className="text-xl font-semibold my-2 flex items-center gap-2">
                <Utensils className="w-5" /> Browse Restaurants
              </h3>
              <p className="text-gray-500 my-2 text-sm">
                Browse restaurants by mood, cuisine, area or dish names
              </p>
            </div>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainSection;
