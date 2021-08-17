const jwt = require("jsonwebtoken");

//los middleware usan adicionalmente un next para indicarles que pueden proceder a ejecutar el codigo
const auth = async (req, res, next) => {
    let jwToken = req.header("Authorization");
    //validamos si existe el token (si hay una sesión)
    if(!jwToken) return res.status(400).send("Authorization denied: No Token");
    
    //Ejemplo, el bearer token llega de la siguiente forma
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEzZmJlYzUwZmVjZTM4MTgwM2Q4MmYiLCJuYW1lIjoiUGVwaXRhIHBlcmV6IiwiaWF0IjoxNjI5MjExMDA1fQ.Be2g_01q4E_f8oRtJ35q-ugDnkh1dypIx7YBK4HWwI4
    // y se separa asi con el split en un array [Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEzZmJlYzUwZmVjZTM4MTgwM2Q4MmYiLCJuYW1lIjoiUGVwaXRhIHBlcmV6IiwiaWF0IjoxNjI5MjExMDA1fQ.Be2g_01q4E_f8oRtJ35q-ugDnkh1dypIx7YBK4HWwI4]
    //divide el token en una parte con la palabra "bearer" (queda en la posición cero) y el token encriptado que se guarda en la posicion 1, este tokem es el que usamos para validar.
    jwToken = jwToken.split(" ")[1];

    //si intentan despistarnos ingresando un token vacio
    if(!jwToken) return res.status(400).send("Authorization denied: No Token")

    try {
        //validamos el paylaod, es decir el cuerpo del jwt sea valido
        const payload = await jwt.verify(jwToken, process.env.SECRET_KEY_JWT);
        req.user = payload;
        //con el next le indicamos que ya verficamos que pertenece a la aplicación y no es un hacker, por lo que puede proceder con la la petición
        next();
    } catch (error) {
        return res.status(400).send("Authorization denied: Invalid Token");
    }
};

module.exports = { auth };