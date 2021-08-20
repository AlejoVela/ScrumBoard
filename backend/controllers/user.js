const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(401).send("Process Failed: Incomplete Data");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(401).send("Process Failed: Email already exist");

  //recibe como parametro la contraseña y la longitud que tendra al encriptarse
  let hash = await bcrypt.hash(req.body.password, 10);

  let role = await Role.findOne({ name: "user" });
  if (!role)
    return res.status(401).send("Process Failed: No role was assigned");

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result)
    return res.status(400).send("Process Failed: error to register user");

  //como trabajamos con información sensible
  //no devolvemos el json como tal sino el jwt
  try {
    let jwt = user.generateJWT();
    return res.status(201).send({ jwt });
  } catch (error) {
    return res.status(400).send("Process Failed: error to register user");
  }
};

const listUser = async (req, res) => {
  //regExp nos permite crear una expresión regular, en esta decimos que podemos obtener
  //cualquier caracter que venga de name o no obtener nada (vacio)
  //en params se toman los parametros que llegan desde la url (el parametro "i" siempre debe ir cuando se cree una nueva expresión)
  let user = await User.find({
    name: new RegExp(req.params["name"], "i"),
  })
    .populate("roleId") //con populate le decimos que no nos muestre el rollid de role sino su valor
    .exec(); //ejecutamos el populate

  if (!user || user.length === 0)
    return res.status(400).send("Process Failed: No users register now");
  return res.status(201).send({ user });
};

const registerAdmin = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(401).send("Process Failed: Incomplete Data");

  let validId = await mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!validId) return res.status(400).send("Process Failed: Invalid Id");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(401).send("Process Failed: Email already exist");

  //recibe como parametro la contraseña y la longitud que tendra al encriptarse
  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result)
    return res.status(400).send("Process Failed: error to register user");

  //como trabajamos con información sensible
  //no devolvemos el json como tal sino el jwt
  try {
    let jwt = user.generateJWT();
    return res.status(201).send({ jwt });
  } catch (error) {
    return res.status(400).send("Process Failed: error to register user");
  }
};

const updateUser = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.email || !req.body.roleId)
    return res.status(401).send("Process Failed: Incomplete Data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    let userFind = await User.findOne({ email: req.body.email });
    pass = userFind.password;
  }

  let user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  if (!user) return res.status(400).send("Process failed: Error editing user");
  return res.status(200).send({ user });
};

const deleteUser = async (req, res) => {
  if (!req.body._id)
    return res.status(401).send("Process Failed: Incomplete Data");

  const user = await User.findByIdAndUpdate(req.body._id, {
    dbStatus: false,
  });
  
  if (!user) return res.status(400).send("Process Failed: Incomplete data");
  return res.status(200).send({ user });
};

module.exports = {
  registerUser,
  listUser,
  registerAdmin,
  updateUser,
  deleteUser,
};
