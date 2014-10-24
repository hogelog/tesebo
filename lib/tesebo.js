
var irc = require('irc');

exports.Tesebo = Tesebo;

function Tesebo(config) {
    var self = this;
    self.config = config;
    self.client = new irc.Client(config.irc.host, config.irc.username, {
        port: config.irc.port,
        userName: config.irc.username,
        password: config.irc.password,
        autoRejoin: true,
        debug: config.irc.debug,
        channels: config.irc.channels
    });
    self.listeners = [];
    self.plugins = [];

    var plugins = config.bot.plugins;
    for (var i = 0; i < plugins.length; ++i) {
        var pluginName = plugins[i][0];
        var options = plugins[i][1] || {};
        self.loadPlugin(pluginName, options);
    }
}

Tesebo.prototype.loadPlugin = function(name, options) {
    var path = "../plugins/" + name;
    console.log("Loading plugin: ", name);
    var plugin = require(path);
    plugin.bot = this;
    plugin.options = options;
    var listeners = plugin.listeners;
    if (listeners) {
        for (var type in listeners) {
            var listener = listeners[type];
            this.client.addListener(type, listener);
            this.listeners.push(listener);
        }
    }
    if (plugin.init) {
        plugin.init();
    }
    this.plugins.push(plugin);
};
