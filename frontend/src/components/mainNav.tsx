import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./usernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <div className="text-white">
          <Button
            className="text-md h-10 px-5 text-md  hover:bg-orange-700 text-white bg-orange-500"
            onClick={async () => await loginWithRedirect()}
          >
            Login or Sign up
          </Button>
        </div>
      )}
    </span>
  );
};

export default MainNav;
