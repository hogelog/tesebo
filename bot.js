console.log("Starting tesebo...");

var Tesebo = require("./lib/tesebo").Tesebo;

process.on("uncaughtException", function(err) {
  console.log("Uncaught Exception: " + err);
});

var config = require("./config.json");

console.log("Connecting to: ", config.irc.host, "...");
var tesebo = new Tesebo(config);
