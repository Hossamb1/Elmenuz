import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/myUserApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const location = useLocation();
  const appState = location.state?.appState as { returnTo?: string };

  console.log(location);

  const hasCreatedUser = useRef(false);
  console.log("appState received through AuthCallPage:", appState);
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    if (appState?.returnTo) {
      navigate(appState.returnTo);
    } else {
      navigate("/");
    }
  }, [createUser, navigate, user, appState]);

  return <>loading...</>;
};

export default AuthCallbackPage;
