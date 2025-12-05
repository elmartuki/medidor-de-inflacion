import { Router } from "express";
import {
  loginUsuariosController,
  obtenerUsuariosController,
  registroUsuarioController,
} from "../controllers/usuarios-controllers.js";
import { validarToken } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", validarToken, obtenerUsuariosController);

// router.use("/:id");

router.post("/registro", registroUsuarioController);

router.post("/login", loginUsuariosController);

// router.use("/:id");

// router.use("/:id");

export default router;
