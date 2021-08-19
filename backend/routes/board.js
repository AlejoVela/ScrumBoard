const BoardController = require("../controllers/board");
const router = require("express").Router();
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
//los middleware siempre se ponen en la ruta
router.post("/saveTask", Auth, ValidateUser, BoardController.saveTask);
router.get("/listTask", Auth, ValidateUser, BoardController.listTasks);
router.put("/updateTask", Auth, ValidateUser, BoardController.updateTask);
router.delete("/deleteTask/:_id", Auth, ValidateUser, BoardController.deleteTask);

module.exports = router;