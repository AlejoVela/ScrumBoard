const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerUser", UserController.registerUser);
//se debe agregar que solo los admin pueden listar usuarios
router.get("/listUser/:name?", Auth, ValidateUser, UserController.listUser);
//con ":name" indicamos que va a recibir un parametro de filtro
//al agregar a ":name" un "?", decimos que este parametro puede ser opcional
//es decir que si no indicamos un parametro, listara a todos los usuarios


module.exports = router;