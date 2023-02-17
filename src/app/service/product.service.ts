import * as fs from "fs";
import { ProductDto } from "../dto/product.dto";
import { ProductModel } from "../../models/product.model";
import { IResponse } from "../contracts/response.contract";

export default class ProductService {

    constructor() { }

    async addProduct(body: ProductDto, file: any): Promise<IResponse> {
        let filePath = this.processFile(body.name, file);
        try {
            let data = {
                ...body,
                uuid: "null",
                file: filePath,
                updatedAt: new Date(),
                createdAt: new Date()
            }
            const respository = new ProductModel(data);
            await respository.save();
            return {
                code: 201,
                message: "New product record added successfully",
            }

        } catch (error) {
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
                }
            }
            if (error.name === "MongoServerError") {
                return {
                    code: 400,
                    message: `Duplicate value for product ${Object.keys(error.keyPattern)[0]} field`,
                }
            }
            return {
                code: 500,
                message: 'Server Error',
                error: [error]
            }

        }
    }


    async fetchAllProducts(perPage, currentPage): Promise<IResponse> {
        perPage = perPage ? Math.ceil(perPage) : 15
        currentPage = currentPage ? Math.ceil(currentPage) : 1
        var count = await ProductModel.count();
        var totalPages = Math.ceil(count / perPage);
        var nextPage = (currentPage + 1) <= totalPages ? `?perPage=${perPage}&currentPage=${currentPage + 1}` : null;
        var lastPage = (currentPage - 1) > 0 ? `?perPage=${perPage}&currentPage=${currentPage - 1}` : null;
        
        const products = await ProductModel.find({}, { '_id': 0, }).skip((currentPage -1) * perPage).limit(perPage * 1)
        const data = {
            data: products,
            meta: {
                currentPage,
                totalPages,
                perPage,
                nextPage,
                lastPage
            }
        }
        return {
            code: 200,
            message: "Products retrieved successfully",
            data: data
        }
    }

    async fetchSingleProduct(uuid: string): Promise<IResponse> {
        const products = await ProductModel.findOne({ uuid }, { '_id': 0, });
        if (products) {
            return {
                code: 200,
                message: "Product retrieved successfully",
                data: [products]
            }
        }
        return {
            code: 400,
            message: "No record of product found",
        }
    }

    async updateProduct(uuid: string, data: any): Promise<IResponse> {

        const products = await ProductModel.findOne({ uuid });
        if (products) {
            const updated = await ProductModel.findOneAndUpdate({ uuid }, { ...data });
            if (updated) {
                return {
                    code: 200,
                    message: "Product updated successdully",
                }
            }
            return {
                code: 400,
                message: "Error updating product",
            }
        }
        return {
            code: 400,
            message: "No record of product found",
        }
    }


    async deleteProduct(uuid: string): Promise<IResponse> {
        //find record
        const product = await ProductModel.findOne({ uuid });
        if (product) {
            const file = product.file as string;
            //delete file
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }

            await product.remove()

            return {
                code: 200,
                message: "Product deleted successfully"
            }
        }
        return {
            code: 400,
            message: "No record of product found",
        }

    }


    private processFile(name, file) {
        const fileName = `${name.replace(" ","-")}-product.${file.originalname.split('.').pop()}`;
        const destination = file.destination;
        const oldFilePath = destination + file.filename
        const newFilePath = destination + fileName
        fs.renameSync(oldFilePath, newFilePath)
        return newFilePath;
    }
}