"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const product_controller_1 = require("../app/controllers/product.controller");
const upload = multer({ dest: 'public/product_avatars/' });
class ProductRoutes {
    constructor() {
        this.productController = new product_controller_1.default();
    }
    routes(app) {
        app.route('/products').post(upload.single('file'), this.productController.addNewProduct);
        app.route('/products').get(this.productController.getAllProducts);
        app.route('/products/:productUuid').get(this.productController.getSingleProduct);
        app.route('/products/:productUuid').patch(this.productController.updateProduct);
        app.route('/products/:productUuid').delete(this.productController.deleteProduct);
    }
}
exports.default = ProductRoutes;
//# sourceMappingURL=product.route.js.map