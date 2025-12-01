import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error(
      "Error: La variable MONGO_URI no está configurada en Vercel."
    );

    throw new Error("La URL de la base de datos no está configurada.");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión exitosa a MongoDB.");
  } catch (error) {
    console.error("Error fatal al conectar la base de datos:", error.message);

    throw error;
  }
};
