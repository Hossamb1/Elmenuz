import { Link } from "react-router-dom";
import elmenus from "../assets/elmenusLogoFlipped.svg";
import MobileNav from "../components/mobileNav";
import MainNav from "../components/mainNav";

const Header = () => {
  return (
    <>
      <div className="p-6 w-full border-b-2">
        <div className="container p-0 max-auto flex justify-between items-center ">
          <Link to="/" className="text-4xl font-bold tracking-tight">
            <div className="flex items-center gap-4">
              <img src={elmenus} alt="" className="h-10" />
              Elmenuz
            </div>
          </Link>
          <div className="md:hidden flex">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav showOrderStatus={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
