import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {

//     const isLoggedIn = localStorage.getItem("isLoggedIn")
//     console.log("Flag Varible : ", localStorage.getItem("isLoggedIn"))



//     if (isLoggedIn == "true") {
//         return children;
//     }
//     else {
//         return <Navigate to='/login' />;
//     }

// }    
// export default ProtectedRoute;

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    
        if (!token) {
            // alert("Please log in.");
            return <Navigate to='/login' />
        }
        return children;



};
export default ProtectedRoute;