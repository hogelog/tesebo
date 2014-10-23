var config = require("../config.json");

var climate;

var botName = config["irc"]["username"];
var pattern = new RegExp("^"+ botName + ":? (?:climate|temparature|humidity|気温|室温|湿度|暑い？|寒い？)$", "i");

function listener(from, to, msg) {
    if (!pattern.test(msg)) {
        return;
    }
    climate.readTemperature(function (err, temp) {
        climate.readHumidity(function (err, humid) {
            var message;
            if (plugin.options.lang == "ja") {
                message = "気温: " + temp.toFixed(1) + "℃, 湿度: " + humid.toFixed(1) + "%";
            } else {
                message = "Temperature: " + temp.toFixed(1) + "℃, Humidity: " + humid.toFixed(1) + "%";
            }
            plugin.bot.client.say(to, message);
        });
    });
}

function init() {
    if (plugin.options.mock) {
        climate = new Object();
        climate.readTemperature = function(callback) {
            callback(null, plugin.options.mock.temperature);
        };
        climate.readHumidity = function(callback) {
            callback(null, plugin.options.mock.humidity);
        };
        return;
    }
    var tessel = require("tessel");
    var module = plugin.options.module || "si7020";
    var port = plugin.options.port;
    var climatelib = require("climate-" + module);
    climate = climatelib.use(tessel.port[port])
}

var plugin = {
    listeners: {
        message: listener
    },
    init: init
};

module.exports = plugin;
