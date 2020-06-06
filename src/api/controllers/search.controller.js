class SearchController {

  constructor({SearchService, adaptRequest}) {
    this._searchService = SearchService;
    this._adaptRequest = adaptRequest;
  }

  async searchItems(req, res) {
    //const httpRequest = this._adaptRequest(req);
    const {q} = req.query;
    try {
     const items = await this._searchService.searchItems(q);
     if(items){
       return res.status(200).send(items.data)
     }else {
       return res.status(400).send('error');
     }
     
    } catch (error) {
      return res.status(500).send(error)
    }
    
    
  }
}

module.exports = SearchController;