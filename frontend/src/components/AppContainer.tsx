import "./AppContainer.css"
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import User from "../pages/user/User"

export default function Hero() {
  const { user, isLoading } = useAuth();
  return isLoading ?(
    <div className='app-container'>
      <h1>Loading...</h1>
    </div>
  ) : user ? (
    <User/>
  ) : (
    <Navigate to="/signin" replace state={{redirectUrl: window.location.pathname}}/>
  )
}
