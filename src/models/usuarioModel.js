import mongoose from "mongoose";

const { Schema } = mongoose;

const UsuariosSchema = new Schema(
  {
    usuario: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
  },
  {
    timestamps: true,
  }
);

export const UsuarioModel = mongoose.model("usuarios", UsuariosSchema);
