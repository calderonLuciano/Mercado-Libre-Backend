const axios = require('axios');

class SearchService {

  searchItems = (query) => {
    const urlSearch = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    return axios.get(urlSearch); 
  }

}



module.exports = SearchService;