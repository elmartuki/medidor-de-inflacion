import argon, { verify } from "argon2";
import { UsuarioModel } from "../models/usuarioModel.js";

export const obtenerUsuariosServicio = async () => {
  const usuarioDB = await UsuarioModel.find();
  if (usuarioDB.length > 0)
    return {
      json: {
        message: "Se encontaron los usuarios",
        datos: usuarioDB,
      },
      statusCode: 200,
    };
  else {
    return {
      json: {
        message: "No se encontaron los usuarios",
      },
      statusCode: 404,
    };
  }
};

export const registroUsuarioServicio = async (nuevoUsuario) => {
  try {
    const nuevoUsuarioDB = new UsuarioModel(nuevoUsuario);
    nuevoUsuarioDB.password = await argon.hash(nuevoUsuarioDB.password);
    await nuevoUsuarioDB.save();

    return {
      json: {
        message: "Se creo el usuario exitosamente",
        datos: nuevoUsuarioDB,
      },
      statusCode: 202,
    };
  } catch (error) {
    return {
      json: {
        message: "No se creo el usuario exitosamente",
      },
      statusCode: 404,
    };
  }
};

export const loginUsuariosServicio = async (datosIngresados) => {
  const existeUsuario = await UsuarioModel.findOne({
    usuario: datosIngresados.usuario,
  });

  if (!existeUsuario) {
    return {
      json: { message: "Este usuario no existe" },
      statusCode: 404,
    };
  } else {
    const contraseniaOK = await verify(
      existeUsuario.password,
      datosIngresados.password
    );

    if (!contraseniaOK) {
      return {
        json: {
          message: "La contraseña es incorrecta",
        },
        statusCode: 401,
      };
    } else {
      return {
        json: {
          message: "Bienvenido de nuevo Jefe.",
        },
        statusCode: 200,
      };
    }
  }
};
