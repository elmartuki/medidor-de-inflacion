import express from "express";
import routes from "./src/routes/index-routes.js";
import { connectDB } from "./src/db/config-db.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api", routes);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto ", port);
});
