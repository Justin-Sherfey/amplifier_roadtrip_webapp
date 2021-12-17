import { Navigate } from "react-router-dom";

function Logout() {
    sessionStorage.clear();
    return <Navigate to="/Home" />;
}

export default Logout;