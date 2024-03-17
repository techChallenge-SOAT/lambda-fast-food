const serverless = require("serverless-http");
const main = require('./src/main');

const app = new main().init();

module.exports.handler = serverless(app);
