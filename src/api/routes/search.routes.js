const { Router } = require("express");

module.exports = function({ SearchController }) {
  const router = Router();

  router.get("/items", SearchController.searchItems.bind(SearchController));
  return router;
};