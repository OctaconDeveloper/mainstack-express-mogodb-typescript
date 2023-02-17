"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_utils_1 = require("./utils/config.utils");
const logger_util_1 = require("./utils/logger.util");
const logger = new logger_util_1.Logger();
app_1.default.listen(config_utils_1.PORT, () => {
    logger.info('Express server listening on port ' + config_utils_1.PORT);
});
//# sourceMappingURL=server.js.map