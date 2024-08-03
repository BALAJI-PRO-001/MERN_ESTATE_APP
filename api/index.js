import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import { logger } from "./utils/logger.js";
import path from "path";
const __dirname = path.resolve();
const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Mongodb Database connected!")
  })
  .catch((error) => {
    console.log(error.message);
  });


// * Request for avoid cool down period
setInterval(() => {
  fetch("https://mern-estate-zlv0.onrender.com/request");
}, 1000 * 10);

app.get("/request", (req, res) => console.log("Request: " + req.url));
app.get("/log", (req, res) => { res.sendFile(path.join(__dirname, "../api/logs/access.log")); });

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port: 3000!");
}); 