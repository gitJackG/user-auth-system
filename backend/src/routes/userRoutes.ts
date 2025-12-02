import { Router } from "express";
import { getUserHandler, getAllUsers, deleteUserHandler } from "../controllers/userController";
import authenticate, { optionalAuthenticate } from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.get("/", optionalAuthenticate, getUserHandler);
userRoutes.get("/all", authenticate, getAllUsers);
userRoutes.delete("/", authenticate, deleteUserHandler);


export default userRoutes;