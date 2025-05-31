import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.listen(3000, () => {
	console.log("Server running at http://localhost:3000");
});
