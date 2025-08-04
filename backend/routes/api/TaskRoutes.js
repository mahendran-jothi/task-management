const express = require("express");
const router = express.Router();
const { verifyAccessToken, tokenInfo } = require("@middlewares/jwtMiddleware");

// CONTROLLER ASSIGNMENTS
const TaskController = require("@controllers/TaskController");
// END CONTROLLER ASSIGNMENTS


// ROUTES START
router.post("/", verifyAccessToken, tokenInfo, TaskController.create);
router.get("/", verifyAccessToken, tokenInfo, TaskController.findAll);
router.get("/:id", verifyAccessToken, tokenInfo, TaskController.findOne);
router.put("/:id", verifyAccessToken, tokenInfo, TaskController.update);
router.delete("/:id", verifyAccessToken, tokenInfo, TaskController.delete);
router.patch("/:id/status", verifyAccessToken, tokenInfo, TaskController.updateStatus);
router.get("/:id/track", verifyAccessToken, tokenInfo, TaskController.getTaskTrack);


// END ROUTES
module.exports = router;
