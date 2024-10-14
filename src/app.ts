import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import { bloodPostRouter } from "./modules/bloodPost/bloodPost.route";
import { userRouter } from "./modules/users/user.route";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
