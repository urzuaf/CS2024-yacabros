import Queries from '../Queries/Queries.js'
import db from '../DB/dbconnect.js'

const getUsers = (req, res) =>{
    db.query(Queries.getAllUsers, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getTeams =(req,resp) =>{
    db.query(Queries.getAllTeams,(error,result)=>{
        if(error) throw error
        resp.status(200).json(result.rows)
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
export default {
    getUsers,
    decirWena,
    decision,
    postNotificacion,
    enviarNotificacion,
    postBases,
    getTeams
}