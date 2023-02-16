import { Response, Request } from "express";
import ProductService from "../service/product.service";
import { IResponse } from "../contracts/response.contract";

export default class ProductController{
  
    public readonly productService: any

    constructor(){
        this.productService = new ProductService();
        // console.log({productService: this.productService})
    }

    async addNewProduct (req: Request, res: Response): Promise<any> {
        // const productService: ProductService = new ProductService();
        const serviceResponse : IResponse = await this.productService.addProduct({});
       return res.status(serviceResponse.code).json(serviceResponse);
    }

    public getAllProducts (req: Request, res: Response) {  
        // return this.productService.fetchAllProducts({})
        return res.status(200).json("Hello") 
    }

   
    public getSingleProduct (req: Request, res: Response) {  
        // return this.productService.fetchSingleProduct({})
        return res.status(200).json("Hello") 
    }

    
    public updateProduct (req: Request, res: Response) {  
        // return this.productService.updateProduct({})
        return res.status(200).json("Hello") 
    }

   
    public deleteProduct (req: Request, res: Response) {  
        // return this.productService.deleteProsuct({})
        return res.status(200).json("Hello") 
    }
}