const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const helper = require("@utils/helper");
const jwtHelper = require("@services/jwt");


const verifyAccessToken = async (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const token = await helper.getBearerToken(req.headers["authorization"]);

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next();
    });
};


const tokenInfo = async (req, res, next) => {
    const bearerToken = req.headers["authorization"].split(" ");
    const token = bearerToken[1];

    const tokenInfo = await jwtHelper.getTokenInfo(token);

    if (!tokenInfo?.audience || !tokenInfo?.subject) {
        return next(createError.Unauthorized("Invalid token"));
    }

    tokenInfo.audience = tokenInfo.audience;
    req.tokenInfo = tokenInfo;

    next();
};

module.exports = {
    verifyAccessToken,
    tokenInfo
};