// app.js
require("module-alias/register");

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const createError = require("http-errors");
const xss = require("xss-clean");

// Cross Origin Resource Sharing - third party middleware
app.use(cors(corsOptions));
// Data Sanitization against site script XSS
app.use(xss());

// built-in middleware for json
app.use(express.json());

// ROUTE
const api = require("@routes/api");
app.use("/api/v1", api);
// END ROUTE

// DEFAULT ROUTES
app.use(async (req, res, next) => {
    next(createError.NotFound("This route does not exist"));
});
// END DEFAULT ROUTES


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        statusCode: err.status,
        message: err.message,
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;
