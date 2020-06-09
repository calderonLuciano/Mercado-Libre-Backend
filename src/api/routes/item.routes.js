const { Router } = require("express");

module.exports = ({ ItemController }) => {
  const router = Router();

  router.get("/items", ItemController.searchItems.bind(ItemController));
  router.get("/items/:id", ItemController.findItemsById.bind(ItemController));

  return router;
};
