"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
const product_route_1 = require("./product.route");
class ApiRoutes {
    constructor() {
        this.productRoutes = new product_route_1.default();
    }
    routes(app) {
        this.productRoutes.routes(app);
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Welcome to my API'
            });
        });
        app.route('*')
            .get((req, res) => {
            res.status(200).send({
                message: '404'
            });
        });
    }
}
exports.ApiRoutes = ApiRoutes;
//# sourceMappingURL=api.routes.js.map