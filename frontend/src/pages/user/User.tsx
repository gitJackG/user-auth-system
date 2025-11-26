import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./User.css"

export default function User() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { user } = useAuth();
    const { email, verified, createdAt } = user;
    const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
        queryClient.clear();
        navigate("/signin", { replace: true });
    },
    });

  return (
    <div className='user-container'>
      <h1>email: </h1>
      <p>{email}</p>
      <h1>verified: </h1>
      <p>{verified.toString()}</p>
      <h1>createdAt: </h1>
      <p>{createdAt}</p>
      <button onClick={signOut}>sign out</button>
    </div>
  )
}
