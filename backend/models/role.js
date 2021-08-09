const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: {type: Date, default: Date.now}, //con default enviamos un datos por defecto a la base dedatos
    dbStatus: Boolean, //puede ir con comas opcionalmente pero es buena practica dejarla
});

const role = mongoose.model("role", roleSchema);
module.exports = role;