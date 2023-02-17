import * as multer from "multer";
import ProductController from "../app/controllers/product.controller";

const upload = multer({dest: 'public/product_avatars/'})

export default class ProductRoutes {  
    private readonly productController: ProductController;
    
    constructor(){
        this.productController = new ProductController();
    }
    
    public routes(app): void {    
        app.route('/products').post(upload.single('file'), this.productController.addNewProduct)
        app.route('/products').get(this.productController.getAllProducts)
        app.route('/products/:productUuid').get(this.productController.getSingleProduct)
        app.route('/products/:productUuid').patch(this.productController.updateProduct)
        app.route('/products/:productUuid').delete(this.productController.deleteProduct)
    }
}