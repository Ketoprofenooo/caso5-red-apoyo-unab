const Request =
require("../models/request");

const getRequests =
async (req, res) => {

  try {

    const requests =
      await Request.find();

    res.json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getRequestById =
async (req, res) => {

  try {

    const request =
      await Request.findById(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message:
          "Solicitud no encontrada"
      });

    }

    res.json(request);

  } catch {

    res.status(400).json({
      message: "ID inválido"
    });

  }

};

const createRequest =
async (req, res) => {

  try {

    const {
      student,
      type,
      description
    } = req.body;

    if (
      !student ||
      !type ||
      !description
    ) {

      return res.status(400).json({
        message:
          "Los campos student, type y description son obligatorios"
      });

    }

    const request =
      await Request.create(req.body);

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateRequest =
async (req, res) => {

  try {

    const request =
      await Request.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!request) {

      return res.status(404).json({
        message:
          "Solicitud no encontrada"
      });

    }

    res.json(request);

  } catch {

    res.status(400).json({
      message:
        "ID inválido"
    });

  }

};

const deleteRequest =
async (req, res) => {

  try {

    const request =
      await Request.findByIdAndDelete(
        req.params.id
      );

    if (!request) {

      return res.status(404).json({
        message:
          "Solicitud no encontrada"
      });

    }

    res.json({
      message:
        "Solicitud eliminada correctamente"
    });

  } catch {

    res.status(400).json({
      message:
        "ID inválido"
    });

  }

};

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
};