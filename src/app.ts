import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";
import cookieParser from "cookie-parser";

const app: Application = express();

const cors_sites = [
  "http://localhost:3000",
  "https://blood-bank-frontend-blue.vercel.app",
];

app.use(
  cors({
    origin: cors_sites,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  next();
});
app.use("/api/v1", router);

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

app.get("/", (req, res) => {
  console.log("Request Origin:", req.headers.origin);
  res.send("Hello Blood Bank!");
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", cors_sites);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API NOT Found !",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});

export default app;
