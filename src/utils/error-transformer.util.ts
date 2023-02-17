export const ErrorTransformer = (errors: Array<any>): any => {
    let errorTexts = Array();
    for (const errorItem of errors) {
        let obj = {
            field: errorItem.property,
            message: Object.values(errorItem.constraints)
        }
        errorTexts = errorTexts.concat(obj);
    }
    return errorTexts
}
