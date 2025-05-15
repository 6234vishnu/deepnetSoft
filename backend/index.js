import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import menueRouter from "./routes/menuRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: frontendUrl,
    methods: "GET,POST,PUT,PATCH,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("backend connected");
});
app.use("/menu", menueRouter);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
