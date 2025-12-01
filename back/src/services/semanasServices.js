import { semanasModel } from "../models/semanasModel.js";

export const obtenerSemanasService = async () => {
  const semanasDB = await semanasModel.find();

  if (semanasDB.length > 0) {
    return {
      json: {
        message: "Se encontraron las semanas de la base de datos",
        data: semanasDB,
      },
      statusCode: 200,
    };
  } else {
    return {
      json: {
        message: "No se encontraron las semanas de la base de datos",
        data: semanasDB,
      },
      statusCode: 404,
    };
  }
};

export const crearSemanaServices = async (nuevaSemana) => {
  try {
    const nuevaSemanaDB = new semanasModel(nuevaSemana);
    await nuevaSemanaDB.save();

    return {
      json: {
        message: "Se creo la semana exitosamente",
      },
      statusCode: 202,
    };
  } catch (error) {
    return {
      json: {
        message: "No se creo la semana exitosamente",
        error: error,
      },
      statusCode: 404,
    };
  }
};

export const editarSemanaServices = async (id, editarSemana) => {
  const semanaActualizada = await semanasModel.findByIdAndUpdate(
    id,
    editarSemana,
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    json: {
      mensaje: "Semana editada con éxito",
      datos: semanaActualizada,
    },
    statusCode: 202,
  };
};

export const eliminarSemanaService = async (id) => {
  const semanaEliminada = await semanasModel.findByIdAndDelete(id);

  return {
    json: {
      mensaje: "Semana eliminada con éxito",
      datos: semanaEliminada,
    },
    statusCode: 202,
  };
};
