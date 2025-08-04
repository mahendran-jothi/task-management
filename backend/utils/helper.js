const bcrypt = require("bcrypt");
class helper {


    static getBearerToken = async (requestHeader) => {
        const bearerToken = requestHeader.split(" ");
        const token = bearerToken[1];
        return await token;
    };


    static hashPassword = async (originalData) => {
        const saltRounds = 10;
        const encryptedData = bcrypt.hashSync(originalData, saltRounds);
        return encryptedData;
    };


    static successResponse = (dataObject, message) => {
        return { status: true, message: message, data: dataObject };
    };


    static failedResponse = (dataObject, message) => {
        return { status: false, message: message, data: dataObject };
    };


    static verifyPassword = async (original_password, encrypted_password) => {
        const convertedHashedPassword = encrypted_password.replace(/^\$2y(.+)$/i, "$2b$1");
        return await bcrypt.compare(original_password, convertedHashedPassword);
    };


    static convertToTitleCase = async (str) => {
        return str.replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };


    static createSlug = async (input) => {
        return input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    };



    static handleControllerError = async (error, next) => {
        if (error.isJoi) {
            error.status = 422;
        } else if (error.name === 'ValidationError' && error.errors) {
            const messages = Object.values(error.errors).map(err => err.message);
            console.log("🚀 ~ helper ~ messages:", messages)
            error.status = 422;
            error.message = messages[0];
        }
        next(error);
    };

}

module.exports = helper;