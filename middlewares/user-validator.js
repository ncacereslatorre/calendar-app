const { response } = require('express');

const userValidator = ( req , res = response , next )=> {

        let user = await User.findOne(req.email);
        if( user ){
            return res.status(400).json({
                ok: false,
                msg:'Ya existe un usuario con ese email'
            });
        }
        next();
}

module.exports = {
    userValidator
}