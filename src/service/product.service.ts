import { IResponse } from "../contracts/response.contract";

export default class ProductService {

    constructor() {}

    async addProduct(product:any) : Promise<IResponse>{
        return {
            code: 200,
            message: "testing",
            data: [],
            error: []
        }
    }
    async fetchAllProducts(product) : Promise<any>{}
    async fetchSingleProduct(product) : Promise<any>{}
    async updateProduct(product) : Promise<any>{}
    async deleteProsuct(product) : Promise<any>{}
    // async addProduct(product) : Promise<any>{}
}