var tessel = require('tessel'),
    config = require("config");

var climate;

var botName = config.get("irc")["username"];
var pattern = new RegExp("^"+ botName + ":? (?:climate|temparature|humidity|気温|室温|湿度|暑い？|寒い？)$", "i");

function listener(from, to, msg) {
  if (msg.search(pattern) == -1) {
    return;
  }
  climate.readTemperature(function (err, temp) {
    climate.readHumidity(function (err, humid) {
      var message = "気温: " + temp.toFixed(1) + "℃, 湿度: " + humid.toFixed(4) + "%";
      plugin.bot.respond({from: botName, to: to}, message);
    });
  });
}

function init() {
  var module = plugin.options.module || "si7020";
  var port = plugin.options.port;
  var climatelib = require("climate-" + module);
  climate = climatelib.use(tessel.port[port])
}

var plugin = {
  listeners: {
    message: listener
  },
  initPlugin: init
};

module.exports = plugin;
