import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    console.log("Flag Varible : ", localStorage.getItem("isLoggedIn"))



    if (isLoggedIn == "true") {
        return children;
    }
    else {
        return <Navigate to='/login' />;
    }

}
export default ProtectedRoute;