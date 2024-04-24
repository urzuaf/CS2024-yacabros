import Queries from '../Queries/Queries.js'
import db from '../DB/dbconnect.js'

const getUsers = (req, res) =>{
    db.query(Queries.getAllUsers, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const postNotificacion = (req, res) =>{
    const {email} = req.body
    db.query({text: Queries.getNotificacion, values: [email]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const decision = (req, res) =>{
    const {id, des} = req.body
    if(des){
        db.query({text: Queries.aceptarNotificacion, values: [id]}, (error, results)=>{
            if (error) throw error
            res.status(200)
        })
    }
    else{
        db.query({text: Queries.rechazarNotificacion, values: [id]}, (error, results)=>{
            if (error) throw error
            res.status(200)
        })
    }
}

const enviarNotificacion = (req,res) =>{
    const {desc, emisor, destinatario} = req.body
    db.query({text: Queries.sendNotificacion, values: [desc,emisor,destinatario]}, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const postBases = (req, res) =>{
    const {id, bases} = req.body
    db.query({text: Queries.updateBases, values: [bases, id]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const decirWena = (req, res) =>{
    res.send("wena")
}
const postTorneo = (req, res) =>{
    const {nombre, finicio, ftermino, formato, premio, deporte,creador} = req.body
    db.query({text: Queries.insertTorneo, values: [nombre, finicio, ftermino, formato, premio, deporte,creador]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
export default {
    getUsers,
    decirWena,
    decision,
    postNotificacion,
    enviarNotificacion,
    postBases,
    postTorneo
}
