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
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={() => sendPasswordReset(email)}>Send Reset Email</button>
            {isPending && <p>loading...</p>}
            {isSuccess && <p>email sent</p>}
            {isError && <p>{error.message}</p>}
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}