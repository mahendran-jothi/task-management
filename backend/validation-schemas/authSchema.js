const Joi = require("joi");


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': "Please enter a valid name.",
        'string.empty': "Please enter a name.",
        'string.min': "Name should have a minimum length of {#limit}.",
        'string.max': "Name should have a maximum length of {#limit}.",
        'any.required': "Name is required."
    }),
    email: Joi.string().email().required().messages({
        'string.base': "Please enter a valid email.",
        'string.empty': "Please enter an email.",
        'string.email': "Please enter a valid email address.",
        'any.required': "Email is required."
    }),
    mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        'string.base': "Please enter a valid mobile number.",
        'string.empty': "Please enter a mobile number.",
        'string.length': "Mobile number should be exactly {#limit} characters long.",
        'string.pattern.base': "Mobile number should contain only digits.",
        'any.required': "Mobile number is required."
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': "Please enter a valid password.",
        'string.empty': "Please enter a password.",
        'string.min': "Password should have a minimum length of {#limit}.",
        'any.required': "Password is required."
    }),
    country: Joi.string().required().messages({
        'string.base': "Please select a valid country.",
        'any.required': "Country is required."
    }),
    state: Joi.string().required().messages({
        'string.base': "Please select a valid state.",
        'any.required': "State is required."
    }),
    city: Joi.string().required().messages({
        'string.base': "Please select a valid city.",
        'any.required': "City is required."
    }),
    gender: Joi.string().valid("male", "female", 'other').required().messages({
        'string.base': "Please select a valid gender.",
        'any.only': "Please select a valid gender: 'male', 'female', or 'other'.",
        'any.required': "Gender is required."
    }),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': "Please enter a valid email.",
        'string.empty': "Please enter an email.",
        'string.email': "Please enter a valid email address.",
        'any.required': "Email is required."
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': "Please enter a valid password.",
        'string.empty': "Please enter a password.",
        'string.min': "Password should have a minimum length of {#limit}.",
        'any.required': "Password is required."
    })
});

module.exports = {
    registerSchema,
    loginSchema
};
