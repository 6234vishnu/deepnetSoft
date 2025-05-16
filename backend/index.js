import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js'
import cors from "cors";
import menueRouter from "./routes/menuRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;
console.log(process.env.FRONTEND_URL);


const allowedOrigins = ['https://deepnet-soft-two.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: frontendUrl,
//     methods: "GET,POST,PUT,PATCH,OPTIONS",
//     allowedHeaders: "Content-Type, Authorization",
//     credentials: true,
//   })
// );
connectDB()

app.get("/", (req, res) => {
  res.send("backend connected");
});
app.use("/menu", menueRouter);


  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });

