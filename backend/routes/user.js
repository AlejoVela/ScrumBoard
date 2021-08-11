const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.get("/listUser/:name?", UserController.listUser);
//con ":name" indicamos que va a recibir un parametro de filtro
//al agregar a ":name" un "?", decimos que este parametro puede ser opcional
//es decir que si no indicamos un parametro, listara a todos los usuarios


module.exports = router;