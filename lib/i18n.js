var vsprintf = require("sprintf").vsprintf;

exports.i18n = i18n;

function i18n(locale) {
    var self = this;
    self.locale = locale;

    var path = "./locales/" + locale + ".json";

    console.log("Loading locale: ", path);

    var messages = require(path);

    self.__ = function(name) {
        var message = messages[name] ? messages[name] : name;

        if (arguments.length == 1) {
            return message;
        }
        var args = Array.prototype.slice.call(arguments);
        return vsprintf(message, args.slice(1));
    };

    return this;
}
