"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = require("helmet");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const api_routes_1 = require("./routes/api.routes");
const db_connection_util_1 = require("./utils/db-connection.util");
const error_middleware_1 = require("./app/middlewares/error.middleware");
class App {
    constructor() {
        this.apiRoutes = new api_routes_1.ApiRoutes();
        this.dbConnection = new db_connection_util_1.default();
        this.app = express();
        this.dbConnection.connect();
        this.config();
        this.apiRoutes.routes(this.app);
        this.app.use(error_middleware_1.default);
    }
    config() {
        this.app.use(cors());
        this.app.use((0, helmet_1.default)());
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map