const express = require("express");

const router =
  express.Router();

const {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
} =
require(
  "../controllers/requestController"
);

router.get(
  "/",
  getRequests
);

router.get(
  "/:id",
  getRequestById
);

router.post(
  "/",
  createRequest
);

router.put(
  "/:id",
  updateRequest
);

router.delete(
  "/:id",
  deleteRequest
);

module.exports = router;