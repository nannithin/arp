import "./env.js";

import express from "express"
import mongoose from "mongoose"


import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import paymentRoutes from "./routes/payment.routes.js";


const app = express()
app.set("trust proxy", 1)
// Middleware




app.use(express.json())
app.use(cookieParser());

app.use(
  cors({
    origin: "https://www.mygrono.com",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.use("/api/payment", paymentRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).send("ok");
});


// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(!!process.env.STRIPE_SECRET_KEY);
    
    console.log("MongoDB connected")
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running")
    )
  })
  .catch((err) => console.error(err))
