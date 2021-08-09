//Algunos programadores, suele empezar el nombre del módulo con mayuscula para indicar que es un modulo propio que creamos nosotros y no de los modulos de node
const Role = require("../models/role");
//import role from "../models/role"; con ES6

//para devolverle un mensaje de que ha sido registrado el usuario usamos res (response)
const registerRole = async (req, res) => {
    //body es el cuerpo del json, ya que el req trae muchas cosas
    if (!req.body.name || !req.body.description) 
        return res.status(401).send("Process failed: Incomplete data");
    
    const existingRole = await Role.findOne({name: req.body.name});
    if (existingRole) return res.status(401).send("Process failed: role already exist");

    const role = new Role({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true,
    });

    const result = await role.save();
    if(!result) return res.status(401).send("Failed to register role");

    return res.status(201).send( { role } );
};

const listRole = async (req, res) => {
    const role = await Role.find();
    if(!role) return res.status(401).send("No role");
    return res.status(200).send( {role} );
};

module.exports = { registerRole, listRole };
