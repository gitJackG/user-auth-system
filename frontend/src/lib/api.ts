import API from "../config/apiClient";

export const register = async (data: any) => API.post("/auth/register", data);
export const login = async (data: any) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");
export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });
export const resetPassword = async ({ verificationCode, password }: { verificationCode: string, password: string }) =>
  API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/user");
export const getAll = async () => API.get("/user/all");
export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id: string) => API.delete(`/sessions/${id}`);
export const googleStart = () => { window.location.href = `${API.defaults.baseURL}/auth/google` };
export const unlinkGoogle = async () => API.delete("/auth/google");
export const githubStart = () => { window.location.href = `${API.defaults.baseURL}/auth/github` };
export const unlinkGithub = async () => API.delete("/auth/github");
export const discordStart = () => { window.location.href = `${API.defaults.baseURL}/auth/discord` };
export const unlinkDiscord = async () => API.delete("/auth/discord");
export const facebookStart = () => { window.location.href = `${API.defaults.baseURL}/auth/facebook` };
export const unlinkFacebook = async () => API.delete("/auth/facebook");

export const deleteAccount = async () => API.delete("/user");