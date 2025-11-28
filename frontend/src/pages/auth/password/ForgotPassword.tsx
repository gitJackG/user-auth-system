import { sendPasswordResetEmail } from "../../../lib/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./ForgotPassword.css"
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const {
        mutate: sendPasswordReset,
        isPending,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: sendPasswordResetEmail,
    });

    return (
        <div className="forgot-password-container">
            <h1 className="forgot-password-title">Forgot Password</h1>
            <input className="forgot-password-input" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <button className="forgot-password-btn" onClick={() => sendPasswordReset(email)}>Send Reset Email</button>
            {isPending && <p>loading...</p>}
            {isSuccess && <p>email sent</p>}
            {isError && <p>{error.message}</p>}
            <div className="forgot-password-question-area">
                <div className="forgot-password-question">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign Up</Link>
                </div>
                <div className="forgot-password-question">
                    <p>Already have an account?</p>
                    <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
}