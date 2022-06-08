const { request , response } = require('express');

//Modelo
const Event = require('../models/Event');


const getEvent = async( req, res = response ) => {

    const events = await Event.find()
                              .populate('user','name');


    res.status(200).json({
        ok : true,
        events
    });

}

const createEvent = async( req = request , res = response  ) => {
    
    const event = new Event( req.body );
    try {
                
        event.user = req.uid;

        const eventoAdd = await event.save();
                         
        res.status(201).json({
            ok: true,
            event: eventoAdd
        });
    

    }catch(error){
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateEvent = async( req = request , res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try{

        const event = await Event.findById( eventId );

        if( ! event ){
            return res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventId , newEvent , { new:true } );

        res.status(200).json({
            ok: true,
            event:eventoActualizado
        });

    }catch(error){
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
        
}

const deleteEvent = async( req = request , res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe para eliminar'
            });
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios para eliminar este evento'
            });
        }

        //No necesito hacer un nuevo objeto

        const eventDeleted = await Event.findByIdAndDelete( eventId );

        res.status(200).json({
            ok:true,
            msg:'Evento eliminado con exito',
            event:eventDeleted
        });

    }catch(error){
        
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
    
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent
}