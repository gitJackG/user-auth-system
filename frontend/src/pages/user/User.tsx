import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logout, getAll, googleLink, unlinkGoogle, githubLink, unlinkGithub, discordLink, unlinkDiscord, facebookLink, unlinkFacebook, deleteAccount, setPassword } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./User.css";
import { useState, useEffect } from "react";

export default function User() {
  const [newPassword, setNewPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [isGithubLinked, setIsGithubLinked] = useState(false);
  const [isDiscordLinked, setIsDiscordLinked] = useState(false);
  const [isFacebookLinked, setIsFacebookLinked] = useState(false);
  const { user } = useAuth();
  const userData = user as any;

  const { email, password, verified, createdAt, providers } = userData || {};

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: countData } = useQuery({
    queryKey: ["userCount"],
    queryFn: getAll,
  });

  const handleSetPassword = async () => {
    if (!isValidPassword) {
      setShowErrors(true);
      return;
    }
    try {
      await setPassword(newPassword, email);
      alert("Password set successfully!");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "An unexpected error occurred";
      alert(msg);
    }
  };

  const count = (countData as any)?.count;

  const { mutate: signOutMutation } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/signin", { replace: true });
    },
  });

  function handleDeleteAccount() {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;
    deleteAccountMutation();
  };

  const { mutate: deleteAccountMutation } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate("/signin", { replace: true });
    },
  });

  const { mutate: unlinkGoogleMutation } = useMutation({
    mutationFn: unlinkGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: unlinkGithubMutation } = useMutation({
    mutationFn: unlinkGithub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: unlinkDiscordMutation } = useMutation({
    mutationFn: unlinkDiscord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: unlinkFacebookMutation } = useMutation({
    mutationFn: unlinkFacebook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });


  useEffect(() => {
    setIsGoogleLinked(providers?.includes("google"));
    setIsGithubLinked(providers?.includes("github"));
    setIsDiscordLinked(providers?.includes("discord"));
    setIsFacebookLinked(providers?.includes("facebook"));
  }, [providers]);

  return (
    <div className="user-container">

      <div className="user-profile">
        <div className="user-section">
          <h1>Email:</h1>
          <p>{email}</p>
        </div>

        <div className="user-section">
          <h1>Verified:</h1>
          <p>{verified?.toString()}</p>
        </div>

        <div className="user-section">
          <h1>Created At:</h1>
          <p>{createdAt}</p>
        </div>

        <div className="user-section">
          <h1>Linked Accounts</h1>
          <p>(press to unlink)</p>
          <div className="linked-accounts">
            {isGoogleLinked && (
              <button className="oauth-btn" onClick={() => unlinkGoogleMutation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </button>
            )}

            {isGithubLinked && (
              <button className="oauth-btn" onClick={() => unlinkGithubMutation()}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
              </button>
            )}

            {isDiscordLinked && (
              <button className="oauth-btn" onClick={() => unlinkDiscordMutation()}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#8c9eff" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
                </svg>
              </button>
            )}

            {isFacebookLinked && (
              <button className="oauth-btn" onClick={() => unlinkFacebookMutation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                  <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="user-section">
          <h1>Unlinked Accounts</h1>
          <p>(press to link)</p>
          <div className="unlinked-accounts">
            {!isGoogleLinked && (
              <button className="oauth-btn" onClick={googleLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </button>
            )}

            {!isGithubLinked && (
              <button className="oauth-btn" onClick={githubLink}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
              </button>
            )}

            {!isDiscordLinked && (
              <button className="oauth-btn" onClick={discordLink}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                  <path fill="#8c9eff" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
                </svg>
              </button>
            )}

            {!isFacebookLinked && (
              <button className="oauth-btn" onClick={facebookLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                  <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
              </button>
            )}

          </div>
        </div>

        {password == null && (
          <div className="user-section">
            <p>Set a password to secure your account</p>
            <div className="user-password-container">
              <input className="user-password-input" type="password" placeholder="Set a password" onChange={(e) => { setNewPassword(e.target.value); setIsValidPassword(e.target.value.length >= 8); }} />
              <button className="user-password-btn" onClick={() => handleSetPassword()}>Set password</button>
              {showErrors && !isValidPassword ? <p className="signup-password-mismatch">password is invalid (min 8 characters)</p> : <></>}
            </div>
          </div>
        )}

        <div className="user-section">
          <button className="user-sign-out-btn" onClick={() => signOutMutation()}>
            Sign out
          </button>
        </div>

        <div className="user-section">
          <button className="user-delete-account-btn" onClick={handleDeleteAccount}>
            Delete account
          </button>
        </div>
      </div>


      <div className="user-app-info">
        <h1>Amount of users:</h1>
        <p>{count}</p>
      </div>
    </div>
  );
}
