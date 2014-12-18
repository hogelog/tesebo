var config = require("../../config.json");

var botName = config["irc"]["username"];
var pattern = new RegExp("^@?"+ botName + ":? help$", "i");

function listener(from, to, msg) {
    if (!pattern.test(msg)) {
        return;
    }
    var plugins = plugin.bot.plugins;
    for (var i = 0; i < plugins.length; ++i) {
        if (plugins[i].description) {
            plugin.bot.client.say(to, plugins[i].description);
        }
    }
}

var plugin = {
    description: "help - "+ botName + ": help",
    listeners: {
        message: listener
    }
};

module.exports = plugin;
