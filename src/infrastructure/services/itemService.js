const axios = require("axios");

class ItemService {
  constructor({ ItemRepository }) {
    this._itemRepository = ItemRepository;
  }

  searchItems = async (query) => {
    const urlSearch = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`;
    try {
      const response = await axios.get(urlSearch);
      if(response) {
        const result = await this._itemRepository.makeResponseSearch(response.data)
        return result
      }
    } catch (error) { throw new Error(error) }
  };

  getItemsById = async (id) => {
    const urlItem = `https://api.mercadolibre.com/items/${id}`;
    const urlItemDetail = `https://api.mercadolibre.com/items/${id}/description`;
  
    try {
      const itemResponse = await axios.get(urlItem);
      const itemDetailResponse = await axios.get(urlItemDetail);
      if(itemResponse && itemDetailResponse) {
        const result = await this._itemRepository.makeResponseItem(itemResponse.data, itemDetailResponse.data);
        return result;
      }
    } catch (error) {  throw new Error(error) }
  };

  getCategories = async(idCategory) => {
    const urlCategories = `https://api.mercadolibre.com/categories/${idCategory}`;

    try {
      const categoriesResponse = await axios.get(urlCategories);
    
      if(categoriesResponse) {
        return categoriesResponse;
      }
    } catch (error) {
      return  new Error(error) 
    }
  }

}

module.exports = ItemService;
