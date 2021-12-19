import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  return !!props.authUser ? <Outlet /> : <Navigate to="/Home" />;
}

export default PrivateRoute;
