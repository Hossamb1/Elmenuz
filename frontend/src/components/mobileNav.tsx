import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { CircleUserRound, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 max-sm:w-screen  ">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center pl-3 mt-[-2px] pb-3 font-bold  gap-2 ">
              <CircleUserRound className="text-orange-500" />
              <span className="flex items-center">{user?.email}</span>
            </span>
          ) : (
            <span className="pl-3">Welcome to Elmenus</span>
          )}
        </SheetTitle>
        <Separator className="h-[2px] w-screen translate-x-[-24px]" />

        <SheetDescription className="flex flex-col gap-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/order-status"
                className="flex bg-white items-center font-bold hover:text-orange-500 mt-4"
              >
                Order Status
              </Link>

              <Separator />
              <Link
                to="/manage-restaurant"
                className="flex bg-white items-center font-bold hover:text-orange-500"
              >
                My Restaurant
              </Link>
              <hr />
              <Link
                to="/user-profile"
                className="flex bg-white items-center font-bold hover:text-orange-500"
              >
                User Profile
              </Link>

              <Button
                onClick={() => logout()}
                className="flex items-center px-3 font-bold hover:bg-gray-500"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              className="flex-1 font-bold bg-orange-500"
              onClick={() => loginWithRedirect()}
            >
              Log in
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
