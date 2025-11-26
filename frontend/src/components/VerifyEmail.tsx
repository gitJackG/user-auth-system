import "./VerifyEmail.css"
import { verifyEmail } from "../lib/api";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function VerifyEmail() {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });
  return (
    <div className="verifyemail-container">
        {isPending ?(
            <p>Pending...</p>
        ) : (
            <>
                <p>{isSuccess ? "Verified!" : "Invalid"}</p>
                {isError && <p>The link is either invalid or expired.</p>}
            </>
        )}
    </div>
  )
}
