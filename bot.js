console.log("Starting tesebo...");

var bot = require("ircbot");

process.on("uncaughtException", function(err) {
  console.log("Uncaught Exception: " + err);
});

var config = require("./config.json");

var ircConfig = config["irc"];

console.log("Connecting to: ", ircConfig["host"], ":", ircConfig["username"], "...");
var tesebo = new bot(ircConfig["host"], ircConfig["username"], {
  port: 6667,
  userName: ircConfig["username"],
  password: ircConfig["password"],
  autorejoin: true,
  pluginsPath: "./plugins/",
  debug: true,
  secure: true,
  channels: ["#general"]
});

var botConfig = config["bot"];
tesebo.loadPlugin("admin", {nick: botConfig["admin"], cmdprefix: ";"});

var plugins = botConfig.plugins;
for (var i = 0; i < plugins.length; ++i) {
  var plugin = plugins[i][0];
  var options = plugins[i][1] || {};
  console.log("Loading plugin: ", plugin);
  tesebo.loadPlugin(plugin, options);
}
