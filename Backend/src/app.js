import express from "express";
import cookieParser from "cookie-parser";
const app = express()
import authRouter from "./routes/auth.api.js";
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
export default app ;