//codigo de conexión con la db
//requerimos el paquete moongoose, la variable
//constaante mongoose se colorea en rojo en algunos temas de vs
//ya que reconoce que esta variable maneja una base de datos
const mongoose = require("mongoose");

const dbConnection = async () => {
    //manejo de excepciones
    try {
        //siempre que usemos async, debe haber un await y viceversa
        //el await es un "espere a que ejecute algo", funciona como una promesa
        //"mongoose.connect()" es una funcion que nos permite conectarnos a la db de mongo
        //process.env saca las variables de entorno de los .env
        await mongoose.connect(process.env.BD_CONNECTION, {
            //mongo utiliza 4 linea de configuraciones (el orden no importa)
            //encripta lo que se ejecute en mongo
            useNewUrlParser: true,
            //devuelve mensajes de las ediciones algo de la base de datos
            useFindAndModify: false,
            //va a mostrarnos los indices de todas las operaciones CRUD que hagamos
            //los log son mas claros de leer
            useCreateIndex: true,
            //va a unificar toda la escritura de mongo en mensajes de respuesta
            //mostrando respuestas cortas, estructura más entendible
            useUnifiedTopology: true
        });
        console.log("Connection with MongoDB: ON");
    } catch (error) {
        //Esto se imprime solo en la consola del servidor
        console.log("Error connection to MongoDB: ", error);
        //las consolas de los navegadores mostrarán tambien este mensaje
        throw new Error("Error connection to MongoDB: ", error);
    }
};

//necesitamos que este codigo de db.js se convierta en un módulo como mongoose
//para usarlo dentro de nuestro proyecto, por ello siempre debemos exportarlos de
//la siguiente forma (dentro de los corchetes ingresamos todas las funciones a exportar):
module.exports = { dbConnection };