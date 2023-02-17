import { Response, Request } from "express";
import ProductService from "../service/product.service";
import { IResponse } from "../contracts/response.contract";
import { validationPipe } from "../../utils/validator.util";
import { ProductDto, ProductUpdateDto } from "../dto/product.dto";
import { ErrorTransformer } from "../../utils/error-transformer.util";

export default class ProductController {
    constructor() { }

    /**
     * Add new product
     * 
     * @param req
     * @param res 
     * @returns Promise<any>
     */
    async addNewProduct(req: Request, res: Response): Promise<any> {
        const { name, sku, quantity, description, price } = req.body;
        const file = req.file
        const validation = await validationPipe(ProductDto, { name, sku: parseFloat(sku), quantity: parseFloat(quantity), description, price: parseFloat(price) })
        if (validation !== true) {
            return res.status(422).json({
                code: 422,
                message: "Validation error",
                error: [ErrorTransformer(validation)]
            })
        }
        const productService: ProductService = new ProductService();
        const serviceResponse: IResponse = await productService.addProduct({ name, sku, quantity, description, price }, file);
        return res.status(serviceResponse.code).json(serviceResponse);
    }

    /**
     * Fetch all products
     * 
     * @param req
     * @param res 
     * @returns Promise<any>
     */
    async getAllProducts(req: Request, res: Response): Promise<any> {
        const { query: { perPage, currentPage } } = req
        const productService: ProductService = new ProductService();
        const serviceResponse: IResponse = await productService.fetchAllProducts(perPage, currentPage)
        return res.status(serviceResponse.code).json(serviceResponse)
    }


    /**
     * Fetch single product
     * 
     * @param req
     * @param res 
     * @returns Promise<any>
     */
    async getSingleProduct(req: Request, res: Response): Promise<any> {
        const { params: { productUuid } } = req
        const productService: ProductService = new ProductService();
        const serviceResponse: IResponse = await productService.fetchSingleProduct(productUuid)
        return res.status(serviceResponse.code).json(serviceResponse)
    }


    /**
     * Update single product
     * 
     * @param req
     * @param res 
     * @returns Promise<any>
     */
    async updateProduct(req: Request, res: Response): Promise<any> {
        const { params: { productUuid }, body: { sku, availability, description, price, quantity } } = req
        const validation = await validationPipe(ProductUpdateDto, { sku: parseFloat(sku), quantity: parseFloat(quantity), description, price: parseFloat(price), availability })
        if (validation !== true) {
            return res.status(422).json({
                code: 422,
                message: "Validation error",
                error: [ErrorTransformer(validation)]
            })
        }

        const productService: ProductService = new ProductService();
        const serviceResponse: IResponse = await productService.updateProduct(productUuid, { sku, availability, description, price, quantity })
        return res.status(serviceResponse.code).json(serviceResponse)
    }


    /**
     * Delete single product
     * 
     * @param req
     * @param res 
     * @returns Promise<any>
     */
    async deleteProduct(req: Request, res: Response): Promise<any> {
        const { params: { productUuid } } = req
        const productService: ProductService = new ProductService();
        const serviceResponse: IResponse = await productService.deleteProduct(productUuid)
        return res.status(serviceResponse.code).json(serviceResponse)
    }
}