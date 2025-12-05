import { Router } from "express";
import {
  crearProductosController,
  editarProductosController,
  eliminarProductoController,
  movePriceHistoryController,
  obtenerProductosController,
} from "../controllers/productos-controller.js";
import { validarToken } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", obtenerProductosController);

router.post("/create", validarToken, crearProductosController);

router.put("/move-history", validarToken, movePriceHistoryController);

router.put("/:id", validarToken, editarProductosController);

router.delete("/:id", validarToken, eliminarProductoController);

export default router;
