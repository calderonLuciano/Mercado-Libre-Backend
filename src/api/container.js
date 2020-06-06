const { asClass, createContainer, asFunction, asValue } = require("awilix");

const StartUp = require("./startup");
const Server = require("./server");
const config = require("./config/environments");

const Routes = require("./routes");
const SearchRoutes = require('../api/routes/search.routes');

const { SearchService } = require("../infrastructure/services");

const { SearchController } = require("../api/controllers");

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
  .register(
  { 
    SearchRoutes: asFunction(SearchRoutes).singleton()
   }
)
  .register({
    SearchService: asClass(SearchService).singleton(),
  })
  .register({
    SearchController: asClass(SearchController).singleton()
  })
  .register({
    adaptRequest: asValue(adaptRequest)
  });

module.exports = container;
