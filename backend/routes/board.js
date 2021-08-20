const BoardController = require("../controllers/board");
const router = require("express").Router();
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

//los middleware siempre se ponen en la ruta
router.post("/saveTask", Auth, ValidateUser, BoardController.saveTask);
router.post(
  "/saveTaskImg",
  mult,
  Upload,
  Auth,
  ValidateUser,
  BoardController.saveTaskImg
);
router.get("/listTask", Auth, ValidateUser, BoardController.listTasks);
router.put("/updateTask", Auth, ValidateUser, BoardController.updateTask);
router.delete(
  "/deleteTask/:_id",
  Auth,
  ValidateUser,
  BoardController.deleteTask
);

module.exports = router;
