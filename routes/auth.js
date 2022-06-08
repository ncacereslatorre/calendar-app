/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { createUser , loginUser, renewUser  } = require('../controllers/auth')


router.post('/new', 
            [
                check('name','El nombre es obligatorio').not().isEmpty(),
                check('name','El nombre debe tener al menos 6 caracteres').isLength({ min:6 }),
                check('email','El email es obligatorio').isEmail(),
                check('password','El password es obligatorio').not().isEmpty(),
                check('password','El password debe de ser de 6 caracteres').isLength({ min:6 }),
                fieldValidator
            ],
            createUser 
);

router.post('/', [
    check('password','El password debe de ser de 6 caracteres').isLength({ min:6 }),
    check('email','El email es obligatorio').isEmail(),
    fieldValidator
] ,loginUser );

router.get('/renew',
validateJWT,
renewUser );


module.exports = router;
