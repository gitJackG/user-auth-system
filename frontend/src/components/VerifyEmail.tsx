import "./VerifyEmail.css"
import { verifyEmail } from "../lib/api";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function VerifyEmail() {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code || ""),
    enabled: !!code,
    retry: false,
  });

  return (
    <div className="verify-email-container">
      <div className="verify-card">
        {isPending ? (
          <div className="verify-status pending">
            <div className="spinner"></div>
            <h1>Verifying...</h1>
            <p>Please wait while we verify your email address.</p>
          </div>
        ) : isSuccess ? (
          <div className="verify-status success">
            <div className="status-icon success">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1>Email Verified</h1>
            <p>Your email has been successfully verified. You can now access all features.</p>
            <Link to="/" className="verify-btn">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="verify-status error">
            <div className="status-icon error">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h1>Verification Failed</h1>
            <p>The verification link is invalid or has expired.</p>
            <Link to="/signin" className="verify-btn secondary">Back to Sign In</Link>
          </div>
        )}
      </div>
    </div>
  )
}
