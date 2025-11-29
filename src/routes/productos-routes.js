import { Router } from "express";
import {
  crearProductosController,
  editarProductosController,
  eliminarProductoController,
  movePriceHistoryController,
  obtenerProductosController,
} from "../controllers/productos-controller.js";

const router = Router();

router.get("/", obtenerProductosController);

router.post("/create", crearProductosController);

router.put("/move-history", movePriceHistoryController);

router.put("/:id", editarProductosController);

router.delete("/:id", eliminarProductoController);

export default router;
