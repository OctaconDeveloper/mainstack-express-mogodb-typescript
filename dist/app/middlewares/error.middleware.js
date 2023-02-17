"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = require("../../utils/logger.util");
function ErrorMiddleware(error, req, res, next) {
    const logger = new logger_util_1.Logger();
    const status = 500;
    const message = error.message || 'Something went wrong';
    const trace = error.stack;
    const errorObjet = {
        code: status,
        message: message,
        error: [trace]
    };
    logger.error(message, trace);
    //    return res.status(status).send(errorObjet);
}
exports.default = ErrorMiddleware;
;
//# sourceMappingURL=error.middleware.js.map