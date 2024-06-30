import logo from "../assets/elmenusLogoFlipped.svg";
import appDown from "../assets/appDown.png";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#ffedd5] pt-10 ">
      <div className=" w-full flex flex-col justify-between items-center gap-3 container overflow-hidden ">
        <div className=" w-full [&>div]:px-4 [&>div]:w-full  flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col self-center md:justify-start items-center md:self-start px-4   pb-1">
            <div className="w-full flex items-center justify-center gap-3 text-orange-500 text-4xl font-bold tracking-tight mb-2">
              <img src={logo} alt="elmenus logo" className="h-8" />
              Elmenuz
            </div>
            <img src={appDown} alt="" className="min-w-[180px] w-48" />
          </div>
          <div>
            <span className="font-bold border-b-2 border-orange-500 pb-1">
              Restaurants
            </span>
            <ul className="font-medium text-neutral-600 text-[14px] mt-4  flex flex-col flex-wrap h-32 tracking-tighter [&>li]:flex-1">
              <li>Taboon</li>
              <li>Planet Africa</li>
              <li>Lan Yuan - Maadi</li>
              <li>Hadrmout</li>
              <li>Wild House By Crazy Food</li>
            </ul>
          </div>
          <div>
            <span className="font-bold border-b-2 border-orange-500 pb-1">
              Popular Cuisines
            </span>
            <ul className="font-medium text-neutral-600 text-[14px] mt-4  flex flex-col flex-wrap h-32 tracking-tighter [&>li]:flex-1">
              <li>Italian</li>
              <li>Mexican</li>
              <li>Sandwiches</li>
              <li>Japanese</li>
              <li>Pizza</li>
            </ul>
          </div>
          <div>
            <span className="font-bold border-b-2 border-orange-500 pb-1">
              Dishes
            </span>
            <ul className="font-medium text-neutral-600 text-[14px]  mt-4  flex flex-col flex-wrap h-32 tracking-tighter [&>li]:flex-1">
              <li> Breakfast</li>
              <li>Waffles</li>
              <li> Healthy</li>
              <li>Coffee</li>
              <li>Koshary</li>
              <li> Shawerma </li>
              <li>Desserts</li>
              <li> Fried Chicken </li>
              <li>Pizza</li>
              <li>Burgers</li>
              <li>Feteer</li>
              <li>Crepe</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 mb-2 flex justify-around text-neutral-600 max-md:flex-col w-full">
          <div className="flex flex-1 justify-start max-md:flex-col">
            <ul className="flex justify-center gap-2 text-[28px] md:basis-48 md:ml-1  max-md:border-t-[1px] max-md:py-3 border-[#9d9fa22e]">
              <Link to="https://www.facebook.com/hossam.barakat.73307">
                <li className="hover:text-blue-700">
                  <FaFacebook />
                </li>
              </Link>
              <Link to="https://www.instagram.com/hossambarakat15/">
                <li className="hover:text-[#dd2a7b]">
                  <FaInstagram />
                </li>
              </Link>
              <Link to="https://github.com/Hossamb1">
                <li className="hover:text-black">
                  <FaGithub />
                </li>
              </Link>
              <Link to="https://www.linkedin.com/in/hossam-barakat1/">
                <li className="hover:text-[#0077B5]">
                  <FaLinkedin />
                </li>
              </Link>
            </ul>
            <div className="flex md:basis-2/4 justify-evenly text-[14px] max-md:border-y-[1px] max-md:py-3 border-[#9d9fa22e]">
              {/* add links */}
              <span>About Us</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Us</span>
            </div>
          </div>
          <h3 className="basis-1/4 text-center font-medium text-sm max-md:pt-3">
            Made by{" "}
            <Link to="https://www.linkedin.com/in/hossam-barakat1/">
              <span className="italic">Hossam Barakat</span>
            </Link>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
