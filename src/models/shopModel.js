import { Schema, model } from "mongoose";

const shopSchema = new Schema(
  {
    place: {
      facility: { type: String, required: true },
      area: {
        hight: { type: Number, required: false },
        width: { type: Number, required: false },
        depth: { type: Number, required: false },
      },
    },
    redesign: { type: Boolean, required: true },
    budget: { type: Number, required: false },
    date: { type: Date, required: false },
    image: { type: String, required: true },
    // image: { data: Buffer, contentType: String }, // estos son los datos que Multer crea para las img
  },
  { versionKey: false, timestamps: true } // Las opciones van después del objeto del esquema. Cancela la última llave-valor de la versión de Mongo; Deja registro de la hora de creación.
);

export default model("shop", shopSchema);
