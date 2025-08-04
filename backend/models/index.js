"use strict";

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// Connect to MongoDB
mongoose.connect(config.uri, {});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err);
});

// Load all model files and add them to the db object
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".index.js") === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        db[model.modelName] = model;  // Add each model to the db object with its model name as the key
    });


// Transaction helper function
db.withTransaction = async (callback) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const result = await callback(session);
        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


module.exports = db;
