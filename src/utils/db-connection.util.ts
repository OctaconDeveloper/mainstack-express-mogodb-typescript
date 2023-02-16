import mongoose from "mongoose";
import { MONGODB_URL } from "./config.utils";

export default class DBConnection{
    public mongoUrl: string   

    constructor(){
        this.mongoUrl = MONGODB_URL
    }

    connect(): void{
        mongoose.Promise = global.Promise;
        mongoose.set('strictQuery', true)
        mongoose.connect(this.mongoUrl);    
    }

}