import {model, Model, Schema} from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IProduct } from '../app/contracts/product.contract';


const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    uuid: {
        type: String,
        unique: true,
    },
    sku: {
        type: String,
        required: true,
    },
    price: {
        type: Number ,          
        required: true,          
    },
    currency: {
        type: String,
        default: 'USD'            
    },
    quantity: {
        type: Number ,          
        required: true,          
    },
    availability: {
        type: Boolean,
        default: true         
    },
    description: {
        type: String,          
        required: true,
    },
    file: {
        type: String,          
        required: true, 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
ProductSchema.pre('save', function (next) {
    if(!this.isModified('uuid')){
        return next();
    }

    this.uuid = uuid()

    next();
});


export const ProductModel: Model<IProduct> =  model('Product', ProductSchema)