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
const fs = require("fs");
const product_model_1 = require("../../models/product.model");
class ProductService {
    constructor() { }
    addProduct(body, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath = this.processFile(body.name, file);
            try {
                let data = Object.assign(Object.assign({}, body), { uuid: "null", file: filePath, updatedAt: new Date(), createdAt: new Date() });
                const respository = new product_model_1.ProductModel(data);
                yield respository.save();
                return {
                    code: 201,
                    message: "New product record added successfully",
                };
            }
            catch (error) {
                fs.unlinkSync(filePath);
                if (error.name === "ValidationError") {
                    let errors = {};
                    Object.keys(error.errors).forEach((key) => {
                        errors[key] = error.errors[key].message;
                    });
                    return {
                        code: 422,
                        message: "ValidationError",
                        error: [errors]
                    };
                }
                if (error.name === "MongoServerError") {
                    return {
                        code: 400,
                        message: `Duplicate value for product ${Object.keys(error.keyPattern)[0]} field`,
                    };
                }
                return {
                    code: 500,
                    message: 'Server Error',
                    error: [error]
                };
            }
        });
    }
    fetchAllProducts(perPage, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            perPage = perPage ? Math.ceil(perPage) : 15;
            currentPage = currentPage ? Math.ceil(currentPage) : 1;
            var count = yield product_model_1.ProductModel.count();
            var totalPages = Math.ceil(count / perPage);
            var nextPage = (currentPage + 1) <= totalPages ? `?perPage=${perPage}&currentPage=${currentPage + 1}` : null;
            var lastPage = (currentPage - 1) > 0 ? `?perPage=${perPage}&currentPage=${currentPage - 1}` : null;
            const products = yield product_model_1.ProductModel.find({}, { '_id': 0, }).skip((currentPage - 1) * perPage).limit(perPage * 1);
            const data = {
                data: products,
                meta: {
                    currentPage,
                    totalPages,
                    perPage,
                    nextPage,
                    lastPage
                }
            };
            return {
                code: 200,
                message: "Products retrieved successfully",
                data: data
            };
        });
    }
    fetchSingleProduct(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.findOne({ uuid }, { '_id': 0, });
            if (products) {
                return {
                    code: 200,
                    message: "Product retrieved successfully",
                    data: [products]
                };
            }
            return {
                code: 400,
                message: "No record of product found",
            };
        });
    }
    updateProduct(uuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.ProductModel.findOne({ uuid });
            if (products) {
                const updated = yield product_model_1.ProductModel.findOneAndUpdate({ uuid }, Object.assign({}, data));
                if (updated) {
                    return {
                        code: 200,
                        message: "Product updated successdully",
                    };
                }
                return {
                    code: 400,
                    message: "Error updating product",
                };
            }
            return {
                code: 400,
                message: "No record of product found",
            };
        });
    }
    deleteProduct(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            //find record
            const product = yield product_model_1.ProductModel.findOne({ uuid });
            if (product) {
                const file = product.file;
                //delete file
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
                yield product.remove();
                return {
                    code: 200,
                    message: "Product deleted successfully"
                };
            }
            return {
                code: 400,
                message: "No record of product found",
            };
        });
    }
    processFile(name, file) {
        const fileName = `${name.replace(" ", "-")}-product.${file.originalname.split('.').pop()}`;
        const destination = file.destination;
        const oldFilePath = destination + file.filename;
        const newFilePath = destination + fileName;
        fs.renameSync(oldFilePath, newFilePath);
        return newFilePath;
    }
}
exports.default = ProductService;
//# sourceMappingURL=product.service.js.map