//lo usamos porque para el manejo de rutas es necesario tener un servidor y express se encarga de esto
const express = require("express");
const router = express.Router(); //sitema de manejo de rutas de express
const RoleController = require("../controllers/role");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Admin = require("../middleware/admin");
//Metodos GET, POST, PUT Y DELETE

//para el registro usamos post
//el servidor se verpa como http://localhost:3001/api/role/registerRole
//podríamos manejar todo con la misma url y al yo seleccionar el metodo el sistema
//endendería si estoy haciendo un post, put o get, sin embargo esto se considera mala practica (por ejemplo, puede ser un problema si manejamos varios tipos de gets o post)
router.post("/registerRole", Auth, ValidateUser, Admin, RoleController.registerRole);
//para el registro usamos get
//el servidor se vería como http://localhost:3001/api/role/listRole
router.get("/listRole", Auth, ValidateUser, Admin, RoleController.listRole);
router.put("/updateRole", Auth, ValidateUser, Admin, RoleController.updateRole);

//exportamos router ya que esta haciendo todo el trabajo aqui
module.exports = router;