const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");

router.get("/inspector", taskController.getInspector);
router.get("/groupinspector", taskController.getMultiInspector);

module.exports = router;
