"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const config_utils_1 = require("./config.utils");
class Logger {
    debug(message, optionalData) {
        this.logFormatter("debug", message, optionalData);
    }
    warn(message, optionalData) {
        this.logFormatter("warn", message, optionalData);
    }
    error(message, optionalData) {
        this.logFormatter("error", message, optionalData);
    }
    info(message, optionalData) {
        this.logFormatter("info", message, optionalData);
    }
    logFormatter(level, msg, optionalData) {
        const data = `[${config_utils_1.APP_NAME}] - ${(new Date()).toLocaleDateString()}, ${(new Date()).toLocaleTimeString()} LOG[${level.toUpperCase()}] ${msg}`;
        if (optionalData && optionalData.length > 0) {
            console[level](data, optionalData);
        }
        else {
            console[level](data);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.util.js.map