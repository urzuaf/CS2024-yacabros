import express from "express";
import db from "./DB/dbconnect.js";

const server = express()
const puerto = 3000

server.use(express.json())

server.get('/', (req, res)=>{
    db.query("select * from usuario", (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
})
server.get('/a', (req, res)=>{
        res.send("wena")
})
server.listen(puerto, ()=>{
    console.log("Servidor activo en puerto: ", puerto)
})