import { Router } from "express";
import { getUserHandler, getAllUsers} from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/all", getAllUsers);


export default userRoutes;