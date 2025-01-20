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

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://blood-bank-frontend-blue.vercel.app", // Production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Dynamically set the allowed origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

export default app;
