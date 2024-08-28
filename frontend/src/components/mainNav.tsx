import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./usernameMenu";
import { Link } from "react-router-dom";

type Props = {
  showOrderStatus: boolean;
};
const MainNav = ({ showOrderStatus }: Props) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          {showOrderStatus && (
            <Link to="/order-status">
              <span className="mr-5 font-bold hover:text-orange-500">
                Order Status
              </span>
            </Link>
          )}
          <UsernameMenu showOrderStatus={showOrderStatus} />
        </>
      ) : (
        <div className="text-white">
          <Button
            className="text-md h-10 px-5 text-md hover:bg-orange-700 text-white bg-orange-500"
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
