import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  const tokenCompleto = req.headers.authorization;

  if (!tokenCompleto || !tokenCompleto.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Formato de token inválido o token no proporcionado." });
  }

  const token = tokenCompleto.split(" ")[1];

  try {
    const usuarioInfo = jwt.verify(token, process.env.SECRET_KEY);

    if (usuarioInfo.rol === "admin") {
      next();
    } else {
      return res.status(401).json({
        message: "Usuario no autorizado. Requiere rol de administrador.",
      });
    }
  } catch (error) {
    console.error("Error de verificación del token:", error.message);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};
