var oft = require("oft"),
    config = require("../config.json");

var botName = config["irc"]["username"];

function init() {
    var jobs = plugin.options.jobs;
    for (var i = 0; i < jobs.length; ++i) {
        (function(time, type, channel, message){
            oft.atEvery(time, function(){
                if (type == "trigger") {
                    plugin.bot.client.emit("message", botName, channel, message, "");
                } else if (type == "say") {
                    plugin.bot.client.say(channel, message);
                }
            });
        }).apply(this, jobs[i]);
    }
}

var plugin = {
    init: init
};

module.exports = plugin;
