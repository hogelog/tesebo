var climate, i18n, pattern;

function listener(from, to, msg) {
    if (!pattern.test(msg)) {
        return;
    }
    climate.readTemperature(function (err, temp) {
        climate.readHumidity(function (err, humid) {
            var message = i18n.__("climate:message_format", temp.toFixed(1), humid.toFixed(1));
            plugin.bot.client.say(to, message);
        });
    });
}

function init() {
    i18n = plugin.bot.i18n;
    pattern = new RegExp(i18n.__("climate:pattern"));
    plugin.description = "climate - " + i18n.__("climate:pattern");

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
    climate = climatelib.use(tessel.port[port]);
}

var plugin = {
    listeners: {
        message: listener
    },
    init: init
};

module.exports = plugin;
