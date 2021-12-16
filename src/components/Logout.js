import { Navigate } from "react-router-dom";

function Logout(props) {
  props.setIsLoggedIn(false);
  props.setAuthUser(undefined);
  sessionStorage.clear();
  return <Navigate to="/Home" />;
}

export default Logout;
