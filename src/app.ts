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
      console.log("Incoming Origin:", origin); // Log the incoming origin
      if (!origin || allowedOrigins.includes(origin)) {
        console.log("Allowed Origin:", origin); // Log allowed origin
        callback(null, origin);
      } else {
        console.log("Blocked Origin:", origin); // Log blocked origin
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
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
