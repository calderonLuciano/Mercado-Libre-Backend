class ItemController {

  constructor({ItemService, adaptRequest}) {
    this._itemService = ItemService;
    this._adaptRequest = adaptRequest;
  }

  async searchItems(req, res) {
    //const httpRequest = this._adaptRequest(req);
    const {q} = req.query;
    try {
     const items = await this._itemService.searchItems(q);
     if(items){
       return res.status(200).send({ok: true, results: items})
     }else {
       return res.status(200).send({ok: true, results: []});
     }
     
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  async findItemsById(req, res) {
    const {id} = req.params;
    try {
      const items = await this._itemService.getItemsById(id);
      if(items){
        return res.status(200).send({ok: true, results: items})
      }else {
        return res.status(200).send({ok: true, results: []});
      }
      
     } catch (error) {
       return res.status(500).send(error)
     }

  }
}

module.exports = ItemController;