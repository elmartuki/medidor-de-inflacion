import mongoose from "mongoose";

const { Schema } = mongoose;

const productosSchema = new Schema(
  {
    nombre: { type: String, require: true, trim: true },
    precio_hoy: { type: Number, require: true, trim: true },
    precio_1_semana: { type: Number, require: true, trim: true },
    precio_2_semanas: { type: Number, require: true, trim: true },
    precio_3_semanas: { type: Number, require: true, trim: true },
    precio_4_semanas: { type: Number, require: true, trim: true },
    precio_11_24: { type: Number, require: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const productosModel = mongoose.model("productos", productosSchema);
