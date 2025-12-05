import { Router } from "express";
import {
  crearSemanaController,
  editarSemanaController,
  eliminarSemanaController,
  obtenerSemanasController,
} from "../controllers/semanas-controller.js";
import { validarToken } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", obtenerSemanasController);

router.post("/create", validarToken, crearSemanaController);

router.put("/:id", validarToken, editarSemanaController);

router.delete("/:id", validarToken, eliminarSemanaController);

export default router;
