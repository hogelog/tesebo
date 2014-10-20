var CronJob = require("cron").CronJob,
    config = require("../config.json");

var botName = config["irc"]["username"];

function init() {
  var jobs = plugin.options.jobs;
  for (var i = 0; i < jobs.length; ++i) {
    var time = jobs[i][0];
    var channel = jobs[i][1];
    var message = jobs[i][2];
    new CronJob(time, function(){
      plugin.bot.client.emit("message", botName, channel, message);
    }, null, true);
  }
}

var plugin = {
  init: init
};

module.exports = plugin;
