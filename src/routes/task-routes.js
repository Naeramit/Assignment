const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");

router.get("/inspector", taskController.getInspector);

module.exports = router;
