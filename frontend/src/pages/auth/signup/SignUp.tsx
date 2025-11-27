import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css"
import { useState } from "react";
import { register } from "../../../lib/api";
import useAuth from "../../../hooks/useAuth";

export default function SignUp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const {
    mutate: createAccount,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", {
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
        <input type="text" placeholder="password" onChange={(e) => { setPassword(e.target.value); setConfirmPassword(e.target.value) }} />
        <button onClick={() => createAccount({ email, password, confirmPassword })}>submit</button>
      </div>
      <div className="signup-question">
        <p>already have an account?</p>
        <Link to="/signin">signin</Link>
      </div>
    </div>
  )
}
