"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_utils_1 = require("./config.utils");
class DBConnection {
    constructor() {
        this.mongoUrl = config_utils_1.MONGODB_URL;
    }
    connect() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set('strictQuery', true);
        mongoose_1.default.connect(this.mongoUrl);
    }
}
exports.default = DBConnection;
//# sourceMappingURL=db-connection.util.js.map