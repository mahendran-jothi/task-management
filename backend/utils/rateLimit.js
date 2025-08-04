const rateLimit = require("express-rate-limit");
const createError = require("http-errors");


const limiter = rateLimit({
    window: 3 * 60 * 1000,
    max: 10,
    message: "",
    handler: function (req, res, next) {
        next(createError.Conflict("Too many requests, please try again later"));
    },
});

module.exports = limiter;
