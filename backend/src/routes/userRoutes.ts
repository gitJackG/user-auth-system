import { Router } from "express";
import { getUserHandler, getAllUsers, deleteUserHandler } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/all", getAllUsers);
userRoutes.delete("/", deleteUserHandler);


export default userRoutes;