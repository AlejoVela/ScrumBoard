const User = require("../models/user")
const mongoose = require("mongoose");

const user = async (req, res, next) => {
    //estas dos lineas es una opción cuando no nos dejan crear un moddleware pero esto no
    //validara de la misma forma que el middleware ya que solo valida si es un id valid de mongo
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if(!validId) return res.status(400).send("Process Failed: Invalid Id");

    const user = await User.findById(req.user._id);
    if (!user) 
        return res.status(401).send("Process Failed: User without permission");
    next();
};

module.exports =  user;