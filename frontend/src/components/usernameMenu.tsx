import { CircleUserRound } from "lucide-react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center font-bold hover:text-orange-500 gap-2 outline-0">
          <CircleUserRound className="text-orange-500" />
          <div className="flex items-center">
            {user?.email}
            <IoMdArrowDropdown className="text-xl mt-[3px]" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-[340px] mr-6">
          <DropdownMenuItem className="flex gap-5 pointer-events-none h-36 start-3">
            <img src={user?.picture} className="w-[88px] rounded-full" />
            <div className="flex flex-col max-w-[70%] overflow-hidden text-lg">
              welcome,
              <span className="font-bold ">{user?.nickname}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link to="/order-status">
            <DropdownMenuItem>
              <span className="py-2 text-lg">Order Status</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link to="/manage-restaurant">
            <DropdownMenuItem>
              <span className="py-2 text-lg">My Restaurant</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link to="/user-profile">
            <DropdownMenuItem>
              <span className="py-2 text-lg">User Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={() => {
                logout();
                localStorage.clear();
              }}
              className="flex flex-1 font-bold py-5 bg-orange-500"
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
