import landingPage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import { Link } from "react-router-dom";
import elmenus from "../assets/elmenusLogoFlipped.svg";
import MobileNav from "../components/mobileNav";
import MainNav from "../components/mainNav";
const HomePage = () => {
  return (
    <>
      <div className="md:px-5 py-6 absolute top-0 left-0 z-30 w-full text-white">
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
      <div className="flex flex-col gap-12">
        <h1 className="text-center text-5xl text-orange-500 font-medium my-7">
          Food is just a click away!
        </h1>
        <div className="grid md:grid-cols-2 gap-5">
          <img src={landingPage} alt="ordering food" />
          <div className="flex flex-col items-center justify-center gap-4 text-center ">
            <span className="font-bold text-3xl tracking-tighter">
              Order from anywhere!
            </span>
            <span>
              Download the Elmenus app for faster ordering and personalised
              recommendations
            </span>
            <img
              src={appDownloadImage}
              alt="google play or apple Image"
              className="w-35 h-35"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
