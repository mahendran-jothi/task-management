const Joi = require("joi");


const createSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': "Please enter a valid name.",
        'string.empty': "Please enter a name.",
        'string.min': "Name should have a minimum length of {#limit}.",
        'string.max': "Name should have a maximum length of {#limit}.",
        'any.required': "Name is required."
    }),
    description: Joi.string().min(3).required().messages({
        'string.base': "Please enter a valid description.",
        'string.empty': "Please enter a description.",
        'string.min': "Description should have at least {#limit} characters.",
        'any.required': "Description is required."
    }),

    startDate: Joi.date().required().messages({
        'date.base': "Start date must be a valid date.",
        'any.required': "Start date is required."
    }),

    endDate: Joi.date()
        .min(Joi.ref('startDate'))
        .required()
        .messages({
            'date.base': "End date must be a valid date.",
            'date.greater': "End date must be greater than start date.",
            'any.required': "End date is required."
        }),

    totalTask: Joi.number().integer().min(1).required().messages({
        'number.base': "Total task must be a number.",
        'number.min': "Total task must be at least {#limit}.",
        'any.required': "Total task is required."
    })
});



module.exports = {
    createSchema,
};
