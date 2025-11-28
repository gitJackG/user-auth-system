import "./App.css"
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setNavigate } from "./lib/navigation";
import AppContainer from "./components/AppContainer.tsx"
import User from "./pages/user/User.tsx"
import SignIn from "./pages/auth/signin/SignIn.tsx"
import SignUp from "./pages/auth/signup/SignUp.tsx"
import VerifyEmail from "./components/VerifyEmail.tsx";
import ForgotPassword from "./pages/auth/password/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/password/ResetPassword.tsx";
import ProjectAlert from "./components/ProjectAlert.tsx";
import Disclaimer from "./pages/Disclaimer.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <>
      <ProjectAlert />
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<User />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email/verify/:code" element={<VerifyEmail />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
