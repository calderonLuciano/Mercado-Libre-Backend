const axios = require("axios");

class CategoryService {
  constructor() {}

  getCategories = async (idCategory) => {
    const urlCategories = `https://api.mercadolibre.com/categories/${idCategory}`;

    try {
      const categoriesResponse = await axios.get(urlCategories);

      if (categoriesResponse) {
        return categoriesResponse.data;
      }
    } catch (error) {
      new Error(error);
    }
  };
}

module.exports = CategoryService;
