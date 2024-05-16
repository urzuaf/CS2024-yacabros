import Queries from '../Queries/Queries.js'
import db from '../DB/dbconnect.js'

const getUsers = (req, res) => {
    db.query(Queries.getAllUsers, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const getEquiposTorneos = (req, res) =>{
    const {id} = req.body
    //queremos solo traer los equipos de un torneo determinado, no todos.
    db.query({text:Queries.getEquipoTorneo, values : [id]}, (error, result)=>{
        if(error) throw error
        res.status(200).json(result.rows)
    })

}

const getUserByEmail = (req, res) =>{
    const {email} = req.body
    db.query({text:Queries.getUserByEmail, values : [email]}, (error, result)=>{
        if(error) throw error
        res.status(200).json(result.rows)
    })
}

const getTeams =(req,resp) =>{
    db.query(Queries.getAllTeams,(error,result)=>{
        if(error) throw error
        resp.status(200).json(result.rows)
    })
}
  
const postNotificacion = (req, res) => {
    const { email } = req.body
    db.query({ text: Queries.getNotificacion, values: [email] }, (error, results) => {

        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const decision = (req, res) => {
    const { id, des } = req.body
    if (des) {
        db.query({ text: Queries.aceptarNotificacion, values: [id] }, (error, results) => {
            if (error) throw error
            res.status(200)
        })
    }
    else {
        db.query({ text: Queries.rechazarNotificacion, values: [id] }, (error, results) => {
            if (error) throw error
            res.status(200)
        })
    }
}

const enviarNotificacion = (req, res) => {
    const { desc, emisor, destinatario } = req.body
    db.query({ text: Queries.sendNotificacion, values: [desc, emisor, destinatario] }, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const postBases = (req, res) => {
    const { id, bases } = req.body
    
    db.query({ text: Queries.updateBases, values: [bases, id] }, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const insertarEquipoTorneo = async (req, res) => {
    const { equipo, torneo } = req.body
    console.log({ equipo, torneo })
    let eq, tor;
    //primero verificar que el equipo exista
    db.query({text:Queries.existeEquipo, values:[equipo]}, (error, results)=>{
        if(error) throw error
        if(results.rows.length <= 0) {
            return res.sendStatus(400)
            
        }
        // obtener id de torneo y equipo mediante nombre

        db.query({ text: Queries.getEquipoFromName, values: [equipo] }, (error, results) => {
            if (error) throw error
            console.log('resultados: ', results.rows)
            eq = results.rows[0]
            console.log({ eq })
            
            db.query({ text: Queries.getTorneoFromName, values: [torneo] }, (error, results) => {
                if (error) throw error
                console.log('resultadow 2', results.rows)
                tor = results.rows[0]
                console.log({ tor, eq })
                
                // comprobar que la relacion no exista de antemano
                db.query({ text: Queries.existeEquipoenTorneo, values: [eq.id, tor.id] }, (error, results) => {
                    if (error) throw error
                    if(results.rows.length > 0){
                        return res.sendStatus(400)
                        
                    }
                     
                    // insertar relacion entre equipo y torneo
                    db.query({ text: Queries.insertarTorneoEquipo, values: [eq.id, tor.id] }, (error, results) => {
                        if (error) throw error
                        res.status(200).json(results.rows)
                    })
                })
            })
        })
    })

}


const decirWena = (req, res) => {
    res.send("wena")
}
const postTorneo = (req, res) =>{
    const {nombre, finicio, ftermino, formato, premio, deporte,creador} = req.body
    db.query({text: Queries.insertTorneo, values: [nombre, finicio, ftermino, formato, premio, deporte,creador]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const updateBracket = (req, res) =>{
    const {bracket, torneo} = req.body
    db.query({text: Queries.insetBracket, values: [bracket, torneo]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const getEquipo = (req, res) =>{
    const {staff} = req.body
    db.query({text: Queries.selectEquipo, values: [staff]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })

}
const getTorneo = (req, res) =>{
    const {ntorneo} = req.body
    db.query({text: Queries.getTorneoFromName, values: [ntorneo]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })

}
const getUserByEmail = (req, res) => {
    const { email } = req.body; // O puedes usar req.params según cómo estés enviando el correo electrónico
    db.query({ text: Queries.getUsuarioFromEmail, values: [email] }, (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(results.rows[0]);
    });
}

export default {
    getUsers,
    decirWena,
    decision,
    postNotificacion,
    enviarNotificacion,
    postBases,
    insertarEquipoTorneo,
    postTorneo,
    getEquipo,
    getTeams,
    getTorneo,
    getEquiposTorneos,
    updateBracket,
    getUserByEmail
}


