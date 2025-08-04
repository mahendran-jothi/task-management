const express = require("express");
const router = express.Router();
const limiter = require("@utils/rateLimit");


// CONTROLLER ASSIGNMENTS
const AuthController = require("@controllers/AuthController");
// END CONTROLLER ASSIGNMENTS



// ROUTES START
router.post("/login", limiter, AuthController.login);
router.post("/register", AuthController.register);
// END ROUTES
module.exports = router;
