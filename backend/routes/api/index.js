const express = require("express");
const router = express.Router();

// APPLICATION ROUTES
const authRoutes = require("./AuthRoutes");
const taskRoutes = require("./TaskRoutes");
// END APPLICATION ROUTES

// BASE ROUTES
router.get("/", async (req, res) => {
    res.send("WELCOME TO TASK MANAGEMENT </br> ------------------- </br>-------------------</br> NODE ENV IS :- " + process.env.NODE_ENV);
});


router.use("/auth", authRoutes); //TODO: Auth Routes
router.use("/task", taskRoutes); //TODO: Task Routes

// END ROUTES
module.exports = router;
