"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTransformer = void 0;
const ErrorTransformer = (errors) => {
    let errorTexts = Array();
    for (const errorItem of errors) {
        let obj = {
            field: errorItem.property,
            message: Object.values(errorItem.constraints)
        };
        errorTexts = errorTexts.concat(obj);
    }
    return errorTexts;
};
exports.ErrorTransformer = ErrorTransformer;
//# sourceMappingURL=error-transformer.util.js.map