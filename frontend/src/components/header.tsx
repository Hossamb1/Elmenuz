import { Link } from "react-router-dom";
import elmenus from "../assets/elmenusLogoFlipped.svg";
import MobileNav from "../components/mobileNav";
import MainNav from "../components/mainNav";

const Header = () => {
  return (
    <>
      <div className="md:px-5 py-5 w-full border-b-2">
        <div className="container px-3 max-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold tracking-tight ">
            <div className="flex items-center gap-3">
              <img src={elmenus} alt="" className="h-8" />
              Elmenuz
            </div>
          </Link>
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
