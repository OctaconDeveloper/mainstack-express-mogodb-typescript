import {Request, Response} from "express";
import ProductRoutes  from "./product.route";

export class ApiRoutes {   
    
    public productRoutes: ProductRoutes = new ProductRoutes();

    public routes(app): void {  
       this.productRoutes.routes(app)        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Welcome to my API'
            })
        })    
        
        app.route('*')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: '404'
            })
        })         
    }
}