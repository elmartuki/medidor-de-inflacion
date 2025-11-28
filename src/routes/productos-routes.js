import { Router } from "express";
import {
  crearProductosController,
  editarProductosController,
  eliminarProductoController,
  obtenerProductosController,
} from "../controllers/productos-controller.js";

const router = Router();

router.get("/", obtenerProductosController);

// router.get("/:id");

router.post("/create", crearProductosController);

router.put("/:id", editarProductosController);

router.delete("/:id", eliminarProductoController);

export default router;
