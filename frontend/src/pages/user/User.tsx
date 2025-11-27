import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logout, getAll, googleLink, unlinkGoogle } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./User.css"

export default function User() {
  const { user } = useAuth();
  const userData = user as any;
  const { email, verified, createdAt, providers } = userData || {};

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: countData } = useQuery({
    queryKey: ["userCount"],
    queryFn: getAll,
  });
  const count = (countData as any)?.count;

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/signin", { replace: true });
    },
  });

  const { mutate: unlink } = useMutation({
    mutationFn: unlinkGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });

  const isGoogleLinked = providers?.includes("google");

  return (
    <div className='user-container'>
      <h1>email:</h1>
      <p>{email}</p>

      <h1>verified:</h1>
      <p>{verified?.toString()}</p>

      <h1>createdAt:</h1>
      <p>{createdAt}</p>

      <h1>Linked Accounts</h1>
      {isGoogleLinked ? (
        <button onClick={() => unlink()}>Unlink Google</button>
      ) : (
        <button onClick={googleLink}>Link Google</button>
      )}

      <br />
      <br />

      <button onClick={() => signOut()}>sign out</button>

      <h1>Amount of users:</h1>
      <p>{count}</p>
    </div>
  );
}
