import express from "express";
import routes from "./src/routes/index-routes.js";
import { connectDB } from "./src/db/config-db.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "micanastafrecuente.vercel.app",
  "http://localhost:5173",
];


const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());

app.use(cors(corsOptions));

connectDB();

app.use("/api", routes);

export default app;
