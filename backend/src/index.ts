import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import errorHandler from "./middlewares/errorMiddleware";
import authenticate from "./middlewares/authMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
    },
  },
}));
app.use(cookieParser());

app.get("/", (_, res) => {
  return res.status(200).json({
    status: "healthy",
  });
});

app.use("/auth", authRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});