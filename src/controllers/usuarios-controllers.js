import {
  loginUsuariosServicio,
  obtenerUsuariosServicio,
  registroUsuarioServicio,
} from "../services/usuarioServices.js";

export const obtenerUsuariosController = async (req, res) => {
  const { json, statusCode } = await obtenerUsuariosServicio();
  res.statusCode(statusCode).json(json);
};

export const registroUsuarioController = async (req, res) => {
  const nuevoUsuario = req.body;
  const { json, statusCode } = await registroUsuarioServicio(nuevoUsuario);
  res.status(statusCode).json(json);
};

export const loginUsuariosController = async (req, res) => {
  const datosIngresados = req.body;
  const { json, statusCode } = await loginUsuariosServicio(datosIngresados);
  res.status(statusCode).json(json);
};
