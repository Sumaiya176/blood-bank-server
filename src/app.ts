import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ["GET", "POST", "PUT", "DELETE"], // Add any methods you need
    credentials: true, // If you need to include credentials like cookies
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello Blood Bank!");
});

app.use(globalErrorHandler);

export default app;
