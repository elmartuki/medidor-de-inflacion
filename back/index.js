import express from "express";
import routes from "./src/routes/index-routes.js";
import { connectDB } from "./src/db/config-db.js";
import cors from "cors";

const app = express();
const port = 3000;

const allowedOrigins = ["https://inflacion-argy.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use(cors(corsOptions));

connectDB();

app.use("/api", routes);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto ", port);
});
