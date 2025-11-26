import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ResetPassword.css"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { resetPassword } from "../../../lib/api";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const {
        mutate: resetUserPassword,
        isPending,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: resetPassword,
    });
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const exp = Number(searchParams.get("exp"));
    const now = Date.now();
    const linkIsValid = code && exp && exp > now;
    return (
        <div className="reset-password-container">
            {linkIsValid ? (
                <div>
                    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => resetUserPassword({ verificationCode: code, password })}>reset password</button>
                    {isPending && <p>loading...</p>}
                    {isSuccess &&
                        <div>
                            <p>password reset</p>
                            <Link to="/signin">Sign In</Link>
                        </div>
                    }
                    {isError && <p>{error.message}</p>}
                </div>
            ) : (
                <div>
                    <p>link is invalid</p>
                    <p>request a new link</p>
                    <Link to="/password/forgot">forgot password</Link>
                </div>
            )}

        </div>
    );
}