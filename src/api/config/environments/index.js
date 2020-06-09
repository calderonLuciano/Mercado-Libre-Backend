require("dotenv").config();

const DEVELOPMENT = require("./development");

let currentEnv = DEVELOPMENT;

module.exports = currentEnv;
