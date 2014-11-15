var oft = require("oft"),
    config = require("../config.json");

var botName = config["irc"]["username"];

function init() {
    var jobs = plugin.options.jobs;
    for (var i = 0; i < jobs.length; ++i) {
        var time = jobs[i][0];
        var type = jobs[i][1]
        var channel = jobs[i][2];
        var message = jobs[i][3];
        console.log(time, type, channel, message);
        oft.atEvery(time, function(){
            if (type == "trigger") {
                plugin.bot.client.emit("message", botName, channel, message, "");
            } else {
                plugin.bot.client.say(channel, message);
            }
        });
    }
}

var plugin = {
    init: init
};

module.exports = plugin;
