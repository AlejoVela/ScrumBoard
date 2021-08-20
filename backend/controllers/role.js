//Algunos programadores, suele empezar el nombre del módulo con mayuscula para indicar que es un modulo propio que creamos nosotros y no de los modulos de node
const Role = require("../models/role");
//import role from "../models/role"; con ES6

//para devolverle un mensaje de que ha sido registrado el usuario usamos res (response)
const registerRole = async (req, res) => {
  //body es el cuerpo del json, ya que el req trae muchas cosas
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const existingRole = await Role.findOne({ name: req.body.name });
  if (existingRole)
    return res.status(401).send("Process failed: role already exist");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const result = await role.save();
  if (!result) return res.status(401).send("Failed to register role");

  return res.status(201).send({ result });
};

const listRole = async (req, res) => {
  const role = await Role.find();
  if (!role || role.length === 0) return res.status(401).send("No role");
  return res.status(200).send({ role });
};

//solo tocamos la descripción
const updateRole = async (req, res) => {
  if (!req.body._id || !req.body.description)
    return res.status(401).send("Process failed: incomplete data");
  
  let role = await Role.findByIdAndUpdate(req.body._id, {
    description: req.body.description,
  });

  if(!role) return res.status(401).send("Process Failed: Failed to update description");
  return res.status(200).send({ role })
};

//los roles son vituales por lo que es poco viable eliminarlos

module.exports = { registerRole, listRole, updateRole };
