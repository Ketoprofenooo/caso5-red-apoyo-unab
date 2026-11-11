require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const requestRoutes =
require("./routes/requestRoutes");

const errorHandler =
require("./middleware/errorHandler");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/requests",
  requestRoutes
);

app.use(errorHandler);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Servidor activo en puerto ${PORT}`
  );

});