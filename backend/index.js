//express nos ayuda a crear el servidor
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db"); //sin el js para ese db final
//con esto le decimos que requiere configurar esta libreria al usar variables de entorno
require("dotenv").config();
//Configuramos las rutas
const Role = require("./routes/role");
const User = require("./routes/user");
const Board = require("./routes/board");
const Auth = require("./routes/auth");


//por recomendación siempre sellamara app
const app = express();

//con express.json() le decimos que todo lo que usará será en formato .json
app.use(express.json());
//le decimos que todas las reglas de conexión las establecerá cors
app.use(cors());
app.use("/api/auth", Auth);
app.use("/api/role", Role);
app.use("/api/user", User);
app.use("/api/board", Board);

//indicamos el puerto de conexión y como segundo parametro un mensaje que devuelve al realizar la conexion
app.listen(
    process.env.PORT,
    console.log("Backend server running OK, on port: " + process.env.PORT)
);

dbConnection();