"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_NAME = exports.PORT = exports.MONGODB_URL = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.MONGODB_URL = process.env.DB_URL;
exports.PORT = process.env.PORT || 3040;
exports.APP_NAME = process.env.APP_NAME || "Mainstack";
// 'mongodb://dalenguyen:123123@localhost:27017/CRMdb'
//# sourceMappingURL=config.utils.js.map