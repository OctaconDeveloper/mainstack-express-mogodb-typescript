"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const ProductSchema = new mongoose_1.Schema({
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
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD'
    },
    quantity: {
        type: Number,
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
    if (!this.isModified('uuid')) {
        return next();
    }
    this.uuid = (0, uuid_1.v4)();
    next();
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=product.model.js.map