"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../service/product.service");
const validator_util_1 = require("../../utils/validator.util");
const product_dto_1 = require("../dto/product.dto");
const error_transformer_util_1 = require("../../utils/error-transformer.util");
class ProductController {
    constructor() { }
    /**
     * Add new product
     *
     * @param req
     * @param res
     * @returns Promise<any>
     */
    addNewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, sku, quantity, description, price } = req.body;
            const file = req.file;
            const validation = yield (0, validator_util_1.validationPipe)(product_dto_1.ProductDto, { name, sku: parseFloat(sku), quantity: parseFloat(quantity), description, price: parseFloat(price) });
            if (validation !== true) {
                return res.status(422).json({
                    code: 422,
                    message: "Validation error",
                    error: [(0, error_transformer_util_1.ErrorTransformer)(validation)]
                });
            }
            const productService = new product_service_1.default();
            const serviceResponse = yield productService.addProduct({ name, sku, quantity, description, price }, file);
            return res.status(serviceResponse.code).json(serviceResponse);
        });
    }
    /**
     * Fetch all products
     *
     * @param req
     * @param res
     * @returns Promise<any>
     */
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query: { perPage, currentPage } } = req;
            const productService = new product_service_1.default();
            const serviceResponse = yield productService.fetchAllProducts(perPage, currentPage);
            return res.status(serviceResponse.code).json(serviceResponse);
        });
    }
    /**
     * Fetch single product
     *
     * @param req
     * @param res
     * @returns Promise<any>
     */
    getSingleProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { productUuid } } = req;
            const productService = new product_service_1.default();
            const serviceResponse = yield productService.fetchSingleProduct(productUuid);
            return res.status(serviceResponse.code).json(serviceResponse);
        });
    }
    /**
     * Update single product
     *
     * @param req
     * @param res
     * @returns Promise<any>
     */
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { productUuid }, body: { sku, availability, description, price, quantity } } = req;
            const validation = yield (0, validator_util_1.validationPipe)(product_dto_1.ProductUpdateDto, { sku: parseFloat(sku), quantity: parseFloat(quantity), description, price: parseFloat(price), availability });
            if (validation !== true) {
                return res.status(422).json({
                    code: 422,
                    message: "Validation error",
                    error: [(0, error_transformer_util_1.ErrorTransformer)(validation)]
                });
            }
            const productService = new product_service_1.default();
            const serviceResponse = yield productService.updateProduct(productUuid, { sku, availability, description, price, quantity });
            return res.status(serviceResponse.code).json(serviceResponse);
        });
    }
    /**
     * Delete single product
     *
     * @param req
     * @param res
     * @returns Promise<any>
     */
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { productUuid } } = req;
            const productService = new product_service_1.default();
            const serviceResponse = yield productService.deleteProduct(productUuid);
            return res.status(serviceResponse.code).json(serviceResponse);
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map