import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado correctamente");
  } catch (error) {
    console.log("No se pudo conectar correctamente", error);
  }
};
