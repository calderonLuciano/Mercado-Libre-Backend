const { asClass, createContainer, asFunction, asValue } = require("awilix");

const StartUp = require("./startup");
const Server = require("./server");
const config = require("./config/environments");

const Routes = require("./routes");
const ItemRoutes = require("../api/routes/item.routes");

const { ItemService } = require("../infrastructure/services");

const { ItemController } = require("../api/controllers");

const { ItemRepository } = require("../domain/repository");

const { AuthorModel, ItemModel, CategoryModel } = require('../domain/models');

const adaptRequest = require("../api/helpers/adaptRequest");

const container = createContainer();

container
  .register({
    app: asClass(StartUp).singleton(),
    router: asClass(Routes).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    config: asValue(config),
  })
  .register({
    ItemRoutes: asFunction(ItemRoutes).singleton(),
  })
  .register({
    ItemRepository: asClass(ItemRepository).singleton(),
  })
  .register(
  { 
    ItemModel: asClass(ItemModel),
    CategoryModel: asClass(CategoryModel),
    AuthorModel: asClass(AuthorModel)
   }
)
  .register({
    ItemService: asClass(ItemService).singleton(),
  })
  .register({
    ItemController: asClass(ItemController).singleton(),
  })
  .register({
    adaptRequest: asValue(adaptRequest),
  });

module.exports = container;
