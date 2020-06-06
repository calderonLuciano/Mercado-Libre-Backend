const { Router } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

module.exports = function({SearchRoutes}) {
  const router = Router();
  const apiRoute = Router();

  apiRoute
    .use(cors())
    .use(bodyParser.json())
    .use(compression());

  router.use("/api", apiRoute);
  apiRoute.use("/", SearchRoutes);

  return router;
};
