const { request , response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req = request , res = response , next ) => {

    // x-token headers
    const token = req.header('x-token');

    //O sea esto me valida que el token venga en la request
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid , name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
    
        req.uid = uid;
        req.name = name;
        


    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    
    next();
}

module.exports = {
    validateJWT
}