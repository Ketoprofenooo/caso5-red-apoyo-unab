const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    urgency: {
      type: String,
      enum: ["Alta", "Media", "Baja"],
      default: "Media"
    },

    status: {
      type: String,
      enum: [
        "Pendiente",
        "En Proceso",
        "Cerrada"
      ],
      default: "Pendiente"
    },

    professional: {
      type: String,
      default: "-"
    },

    closeDate: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports =
mongoose.model(
  "Request",
  requestSchema
);