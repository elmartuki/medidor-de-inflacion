import {
  crearSemanaServices,
  editarSemanaServices,
  eliminarSemanaService,
  obtenerSemanasService,
} from "../services/semanasServices.js";

export const obtenerSemanasController = async (req, res) => {
  const { json, statusCode } = await obtenerSemanasService();
  res.status(statusCode).json(json);
};

export const crearSemanaController = async (req, res) => {
  const nuevaSemana = req.body;
  const { json, statusCode } = await crearSemanaServices(nuevaSemana);
  res.status(statusCode).json(json);
};

export const editarSemanaController = async (req, res) => {
  const id = req.params.id;
  const editarSemana = req.body;
  const { json, statusCode } = await editarSemanaServices(id, editarSemana);
  res.status(statusCode).json(json);
};

export const eliminarSemanaController = async (req, res) => {
  const id = req.params.id;
  const { json, statusCode } = await eliminarSemanaService(id);
  res.status(statusCode).json(json);
};
