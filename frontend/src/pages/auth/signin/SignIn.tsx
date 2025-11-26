import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./SignIn.css"
import { login } from "../../../lib/api";
import useAuth from "../../../hooks/useAuth";

export default function SignIn() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = location.state?.redirectUrl || "/";

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true,
      });
    },
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='signup-container'>
      <div className="signup-form">
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => signIn({ email, password })}>enter</button>
      </div>
      <div className="signup-question">
        <p>forgot password?</p>
        <Link to="/password/forgot">forgot password</Link>
      </div>
      <div className="signup-question">
        <p>don't have an account?</p>
        <Link to="/signup">signup</Link>
      </div>
    </div>
  )
}
