import { productosModel } from "../models/productosModel.js";

export const obtenerProductosServices = async () => {
  try {
    const productosDB = await productosModel.find();
    if (productosDB.length > 0) {
      return {
        json: {
          message: "Se encontraron los productos",
          data: productosDB,
        },
        statusCode: 200,
      };
    } else {
      return {
        json: {
          message: "No se encontraron los productos",
        },
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      json: {
        message: "Error interno del servidor al obtener productos.",
        error: error.message,
      },
      statusCode: 500,
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
      statusCode: 201,
    };
  } catch (error) {
    return {
      json: {
        message: "No se pudo crear el producto exitosamente",
      },
      statusCode: 400,
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

export async function movePriceHistoryServices() {
  try {
    const productos = await productosModel.find({});
    let productosActualizados = 0;

    const actualizacionesPromesas = productos.map((producto) => {
      producto.precio_3_semanas = producto.precio_2_semanas;

      producto.precio_2_semanas = producto.precio_1_semana;

      producto.precio_1_semana = producto.precio_hoy;

      return producto.save();
    });

    await Promise.all(actualizacionesPromesas);

    productosActualizados = actualizacionesPromesas.length;

    return {
      json: {
        message: "Historial de precios actualizado hasta 3 semanas con éxito.",
        modifiedCount: productosActualizados,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en movePriceHistoryServices:", error);
    return {
      json: {
        message: "Error al mover los precios en la base de datos.",
        error: error.message,
      },
      statusCode: 500,
    };
  }
}
