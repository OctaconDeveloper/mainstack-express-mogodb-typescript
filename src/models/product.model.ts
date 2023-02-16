import * as mongoose from 'mongoose';
import {UUID} from 'uuid-generator-ts';
import { IProduct } from '../contracts/product.contract';

const uuid = new UUID();
// const Schema = mongoose.Schema;

const ProductSchema : mongoose.Schema = new mongoose.Schema({
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
        required: 'Enter product store keeping unit'
    },
    price: {
        type: Number ,          
        required: 'Enter product price'           
    },
    currency: {
        type: String,
        default: 'USD'            
    },
    quantity: {
        type: Number ,          
        required: 'Enter product quantity available'           
    },
    availability: {
        type: Boolean,
        default: true         
    },
    description: {
        type: Text,          
        required: 'Enter product description' 
    },
    file: {
        type: String,          
        required: 'Enter product image' 
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
ProductSchema.pre('save', function (next) {
    if(!this.isModified('uuid')){
        return next();
    }

    this.uuid = uuid.toString()

    next();
});
export default mongoose.model<IProduct>('Product', ProductSchema)