import {
  crearProductosServices,
  editarProductosServices,
  eliminarProductoService,
  obtenerProductosServices,
} from "../services/productosServices.js";

export const obtenerProductosController = async (req, res) => {
  const { json, statusCode } = await obtenerProductosServices();
  res.status(statusCode).json(json);
};

export const crearProductosController = async (req, res) => {
  const nuevoProducto = req.body;
  const { json, statusCode } = await crearProductosServices(nuevoProducto);
  res.status(statusCode).json(json);
};

export const editarProductosController = async (req, res) => {
  const id = req.params.id;
  const editarProducto = req.body;
  const { json, statusCode } = await editarProductosServices(
    id,
    editarProducto
  );
  res.status(statusCode).json(json);
};

export const eliminarProductoController = async (req, res) => {
  const id = req.params.id;
  const { json, statusCode } = await eliminarProductoService(id);
  res.status(statusCode).json(json);
};
