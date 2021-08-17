const BoardController = require("../controllers/board");
const router = require("express").Router();

router.post("/saveTask", BoardController.saveTask);

module.exports = router;