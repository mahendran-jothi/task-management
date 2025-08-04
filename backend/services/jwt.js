const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const db = require("@models");

class jwtHelper {

    static signAccessToken = async (user, subject) => {

        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '1d',
                issuer: "example.com",
                audience: user.toString(),
                subject: subject,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log("Access Token Error" + err);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    };


    static getTokenInfo = async (token) => {
        return new Promise((resolve, reject) => {
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
                    reject(createError.Unauthorized(message));
                }

                const result = {
                    subject: payload.sub,
                    audience: payload.aud,
                };

                resolve(result);
            });
        });
    };
}

module.exports = jwtHelper;
