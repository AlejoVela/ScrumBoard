const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  //Con esto le decimos que el tipo de datos es un objectId perteneciente a "role", siendo role el modelo que exportamos
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

//usamos una función vacia y no un arrow function debedido a que podemos usar la palabra
//reservada this en una funcion vacia
userSchema.methods.generateJWT = function () {
    return jwt.sign({
        //la variables de la izquierda son los nombres con los que quedarán grabados en el payload, por estandar tendra el mismo nombre de las variables del userSchema
        //los datos de la derecha los sacamos del userSchema, como son datos locales usamos "this" para sacarlos seguido del nombre del dato en el userSchema.
        //aqui solo enviamos el id y nombre, datos como correo y contraseña son mas sensibles de manejar
        _id: this._id,
        name: this.name,
        roleId: this.roleId,
        iat: moment().unix(), //ussued at - emitido en (tal fecha)
    },
    //como segundo parametro pasamos nuestra palabra secreta declarada en el .env
    process.env.SECRET_KEY_JWT
    );
};


//guardamos la coleccion "user", con el esquema userSchema en mongo
const user = mongoose.model("user", userSchema);
//exportamos el modulo user
module.exports = user;
