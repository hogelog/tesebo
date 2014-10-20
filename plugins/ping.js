var config = require("../config.json");

var botName = config["irc"]["username"];
var pattern = new RegExp("^"+ botName + ":? ping$", "i");

function listener(from, to, msg) {
  if (msg.search(pattern) == 0) {
    plugin.bot.respond({from: botName, to: to}, from + ": pong")
  }
}

var plugin = {
  listeners: {
    message: listener
  }
};

module.exports = plugin;
