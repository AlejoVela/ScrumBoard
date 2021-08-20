const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");

router.post("/registerUser", UserController.registerUser);
router.post("/registerAdmin", Auth, ValidateUser, Admin, UserController.registerAdmin);
//se debe agregar que solo los admin pueden listar usuarios
router.get("/listUser/:name?", Auth, ValidateUser, Admin, UserController.listUser);
//con ":name" indicamos que va a recibir un parametro de filtro
//al agregar a ":name" un "?", decimos que este parametro puede ser opcional
//es decir que si no indicamos un parametro, listara a todos los usuarios
router.put("/UpdateUser", Auth, ValidateUser, Admin, UserController.updateUser);
router.put("/deleteUser", Auth, ValidateUser, Admin, UserController.deleteUser);

module.exports = router;