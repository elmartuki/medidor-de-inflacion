import { Router } from "express";
import {
  crearSemanaController,
  editarSemanaController,
  eliminarSemanaController,
  obtenerSemanasController,
} from "../controllers/semanas-controller.js";

const router = Router();

router.get("/", obtenerSemanasController);

router.post("/create", crearSemanaController);

router.put("/:id", editarSemanaController);

router.delete("/:id", eliminarSemanaController);

export default router;
