import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  return !!props.authUser ? <Outlet /> : <Navigate to="/Login" />;
}

export default PrivateRoute;
