import mongoose from "mongoose";

const { Schema } = mongoose;

const semanasSchema = new Schema(
  {
    semana: { type: String, required: true, trim: true },
    variacion: { type: Number, required: true, trim: true },
  },
  { timestamps: true }
);

export const semanasModel = mongoose.model("semanas", semanasSchema);
