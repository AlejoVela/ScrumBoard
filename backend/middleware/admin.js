const Role = require("../models/role");


const admin = async (req, res, next) => {
    let role = await Role.findById(req.user.roleId);
    if(!role) return res.status(400).send("");

    if(role.name === "admin") next(); else return res.status(400).send("Process Failed: Unauthorized user");   
};

module.exports = admin;