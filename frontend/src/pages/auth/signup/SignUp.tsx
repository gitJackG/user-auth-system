import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./SignUp.css"
import { useState } from "react";
import { register } from "../../../lib/api";
import useAuth from "../../../hooks/useAuth";

export default function SignUp() {
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const { mutate: createAccount } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: () => {
      const msg = "Email already in use";
      setServerError(msg);
    },
  });


  const arePasswordsMatching = password != "" && confirmPassword != "" && password === confirmPassword;
  const isValidEmail = email != "" && email.includes("@") && email.includes(".");
  const isValidPassword = password != "" && password.length >= 8;
  const handleSubmit = () => {
    if (!arePasswordsMatching || !isValidEmail || !isValidPassword) {
      console.log("invalid email or password");
      setShowErrors(true);
      return;
    }
    createAccount({ email, password, confirmPassword });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      <div className="signup-form">
        <input className="signup-input" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input className="signup-input" type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value); }} />
        <input className="signup-input" type="password" placeholder="confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
        <div className="signup-errors">
          {serverError ? <p className="signup-password-mismatch">{serverError}</p> : <></>}
          {showErrors && !isValidEmail ? <p className="signup-password-mismatch">email is invalid</p> : <></>}
          {showErrors && !isValidPassword ? <p className="signup-password-mismatch">password is invalid (min 8 characters)</p> : <></>}
          {showErrors && !arePasswordsMatching ? <p className="signup-password-mismatch">passwords do not match</p> : <></>}
        </div>
        <button className="signup-btn" onClick={handleSubmit}>submit</button>
      </div>
      <div className="signup-question">
        <p>already have an account?</p>
        <Link to="/signin">signin</Link>
      </div>
    </div>
  )
}
