const container = require("./src/api/container");

const application = container.resolve("app");

application
  .start()
  .then(async () => {
    console.log('Esta levantada!!')
  })
  .catch(err => {
    process.exit();
  });