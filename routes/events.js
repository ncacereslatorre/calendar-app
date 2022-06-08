/*
    Rutas de Eventos / Events
    host + /api/events
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas tienen que pasar por la validacion del JWT

router.use( validateJWT );

const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validator');


const { 
        createEvent, 
        updateEvent,
        deleteEvent,
        getEvent 
    } = require('../controllers/event');

router.get('/', getEvent);


router.post('/new',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        
        fieldValidator
    ]    
    ,
    createEvent
);
 
router.put('/:id', updateEvent );

router.delete('/:id' , deleteEvent );


module.exports = router;
