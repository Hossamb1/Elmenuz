import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "../forms/UserProfileForm/userProfileForm";
import { useGetMyUser } from "../api/myUserApi";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ disabled, onCheckOut, isLoading }: Props) => {
  const {
    loginWithRedirect,
    isLoading: isAuthLoading,
    isAuthenticated,
  } = useAuth0();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="flex-1 bg-orange-500">
        Login to check out
      </Button>
    );
  }
  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton classname="flex-1 bg-orange-500" />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className=" bg-orange-500 flex-1">
          Check out
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isGetUserLoading}
          onSave={onCheckOut}
          title="Confirm Delivery Form"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
