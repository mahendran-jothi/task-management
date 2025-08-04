const helper = require("@utils/helper");
const createError = require("http-errors");
const { registerSchema, loginSchema } = require("@validation-schemas/authSchema");
const JwtController = require("@controllers/JwtController");
const db = require("@models");

class AuthController {

    static register = async (req, res, next) => {
        try {
            const payload = await registerSchema.validateAsync(req.body);

            const doesExist = await db.User.findOne({
                $or: [
                    { mobileNumber: payload.mobileNumber },
                    { email: payload.email }
                ]
            });

            if (doesExist) {
                if (doesExist.mobileNumber === payload.mobileNumber) {
                    throw createError.Conflict('Mobile number already exists');
                } else {
                    throw createError.Conflict('Email already exists');
                }
            }

            const password = await helper.hashPassword(payload.password);
            const userData = {
                name: payload.name,
                email: payload.email,
                mobileNumber: payload.mobileNumber,
                password: password,
                country: payload.country,
                state: payload.state,
                city: payload.city,
                gender: payload.gender
            };

            // Create and save the new user in the database.
            const newUser = new db.User(userData);
            const savedUser = await newUser.save();

            if (!savedUser) {
                throw createError.InternalServerError('Failed to register.');
            }

            // Generate JWT token for the user after successful registration.
            const token = await JwtController.generateUserTokens(savedUser._id, "user");

            // Prepare the data to be sent in the success response.
            const data = {
                token: token,
                user: {
                    name: savedUser.name,
                    email: savedUser.email,
                    mobileNumber: savedUser.mobileNumber,
                    country: savedUser.country,
                    state: savedUser.state,
                    city: savedUser.city,
                    gender: savedUser.gender
                }
            };

            // Send a success response with the generated data.
            res.status(201).send(helper.successResponse(data, 'Registered successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };

    static login = async (req, res, next) => {
        try {
            const payload = await loginSchema.validateAsync(req.body);

            const user = await db.User.findOne({ email: payload.email }).select('+password');

            if (!user) {
                throw createError.Unauthorized("Invalid email.");
            }

            const isMatch = await helper.verifyPassword(payload.password, user.password);
            if (!isMatch) {
                throw createError.Unauthorized("Invalid password.");
            }

            const token = await JwtController.generateUserTokens(user._id, 'user'); // adjust role if needed

            const data = {
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    country: user.country,
                    state: user.state,
                    city: user.city,
                    gender: user.gender
                }
            };

            res.status(200).send(helper.successResponse(data, 'Logged in successfully.'));
        } catch (error) {
            helper.handleControllerError(error, next);
        }
    }
}

module.exports = AuthController;
