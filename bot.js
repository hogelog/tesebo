var bot = require("ircbot"),
    config = require("config");

process.on("uncaughtException", function(err) {
  console.log("Uncaught Exception: " + err);
});

var ircConfig = config.get("irc");
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

var botConfig = config.get("bot");
tesebo.loadPlugin("admin", {nick: botConfig["admin"], cmdprefix: ";"});

var plugins = botConfig.plugins;
for (var i = 0; i < plugins.length; ++i) {
  var plugin = plugins[i][0];
  var options = plugins[i][1] || {};
  tesebo.loadPlugin(plugin, options);
}
