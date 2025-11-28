import { productosModel } from "../models/productosModel.js";

export const obtenerProductosServices = async () => {
  const productosDB = await productosModel.find();
  if (productosDB.length > 0) {
    return {
      json: {
        message: "Se encontrarlos los productos",
        data: productosDB,
      },
      statusCode: 200,
    };
  } else {
    return {
      json: {
        message: "No se encontrarlos los productos",
      },
      statusCode: 404,
    };
  }
};

export const crearProductosServices = async (nuevoProducto) => {
  try {
    const nuevoProductoDB = new productosModel(nuevoProducto);
    await nuevoProductoDB.save();

    return {
      json: {
        message: "Se creo el producto exitosamente",
      },
      statusCode: 202,
    };
  } catch (error) {
    return {
      json: {
        message: "No se pudo crear el producto exitosamente",
      },
      statusCode: 404,
    };
  }
};

export const editarProductosServices = async (id, editarProducto) => {
  const productoActualizado = await productosModel.findByIdAndUpdate(
    id,
    editarProducto,
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    json: {
      mensaje: "Producto editado con éxito",
      datos: productoActualizado,
    },
    statusCode: 202,
  };
};

export const eliminarProductoService = async (id) => {
  const eliminarProducto = await productosModel.findByIdAndDelete(id);

  return {
    json: {
      message: "Producto eliminado con exito",
      datos: eliminarProducto,
    },

    statusCode: 200,
  };
};
