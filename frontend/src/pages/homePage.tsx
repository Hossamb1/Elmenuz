import { Link } from "react-router-dom";
import elmenus from "../assets/elmenusLogoFlipped.svg";
import MobileNav from "../components/mobileNav";
import MainNav from "../components/mainNav";

const HomePage = () => {
  return (
    <>
      <div className="p-6 absolute top-0 left-0 z-30 w-full text-white">
        <div className="container p-0 max-auto flex justify-between items-center">
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
            <MainNav showOrderStatus={false} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-5xl mx-4 text-orange-500 font-medium my-7">
            Food is just a click away!
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img
            src="https://res.cloudinary.com/dmpydourb/image/upload/v1722220187/hgjs6du2nsdvzg9noovr.png"
            alt="ordering food"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-center ">
            <span className="font-bold text-3xl tracking-tighter">
              We deliver anywhere!
            </span>
            <span>
              Download the Elmenus app for faster ordering and personalised
              recommendations
            </span>
            <img
              src="https://res.cloudinary.com/dmpydourb/image/upload/v1722220180/igg5lmwlbsxudsyijdqk.png"
              alt="google play or apple Image"
              className="h-30"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
