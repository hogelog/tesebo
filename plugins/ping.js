var config = require("../config.json");

var botName = config["irc"]["username"];
var pattern = new RegExp("^"+ botName + ":? ping$", "i");

function listener(from, to, msg) {
  if (msg.search(pattern) == -1) {
    return;
  }
  plugin.bot.client.say(to, from + ": pong");
}

var plugin = {
  listeners: {
    message: listener
  }
};

module.exports = plugin;
