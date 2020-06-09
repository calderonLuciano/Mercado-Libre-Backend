const container = require("./src/api/container");

const application = container.resolve("app");

application
  .start()
  .then(async () => {
    console.log("Bienvenido a la aplicación.");
  })
  .catch((err) => {
    process.exit();
  });
