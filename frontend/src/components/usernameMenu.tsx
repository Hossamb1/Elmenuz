import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { IoMdArrowDropdown } from "react-icons/io";

function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2 ">
          <CircleUserRound className="text-orange-500 " />
          <div className="flex items-center ">
            {user?.email}
            <IoMdArrowDropdown className="text-xl mt-[3px]" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-64">
          <DropdownMenuItem className="flex justify-around h-24 pointer-events-none">
            <img src={user?.picture} alt="" className="w-16 rounded-md" />
            <div className="flex flex-col max-w-[70%] overflow-hidden">
              Welcome,
              <span className="font-bold ">{user?.nickname}!</span>
            </div>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Link
              to="/user-profile"
              className="font-bold hover:text-orange-500 py-2"
            >
              User Profile
            </Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Button
              onClick={() => logout()}
              className="flex flex-1 font-bold bg-orange-500"
            >
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UsernameMenu;
