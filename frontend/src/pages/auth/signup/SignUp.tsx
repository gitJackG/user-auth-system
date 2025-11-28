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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <input className="signup-input" type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value); setShowErrors(false) }} />

        <div className="password-wrapper">
          <input
            className="signup-input"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => { setPassword(e.target.value); setShowErrors(false) }}
          />
          <button className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        <div className="password-wrapper">
          <input
            className="signup-input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="confirm password"
            onChange={(e) => { setConfirmPassword(e.target.value); setShowErrors(false) }}
          />
          <button className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
        {showErrors && <div className="signup-errors">
          {serverError ? <p className="signup-password-mismatch">{serverError}</p> : <></>}
          {!isValidEmail ? <p className="signup-password-mismatch">email is invalid</p> : <></>}
          {!isValidPassword ? <p className="signup-password-mismatch">password is invalid (min 8 characters)</p> : <></>}
          {!arePasswordsMatching ? <p className="signup-password-mismatch">passwords do not match</p> : <></>}
        </div>}
        <button className="signup-btn" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className="signup-question-area">
        <div className="signup-question">
          <p>Already have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
