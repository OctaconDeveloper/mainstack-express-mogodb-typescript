import { Document } from "mongoose";

export interface IProduct extends Document{
    name: String,
    uuid: String,
    sku: String,
    price: Number,
    currency: String,
    quantity: Number,
    availability: Boolean,
    description: Text,
    file: String,
} 