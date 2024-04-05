import express from "express";

const server = express()
const puerto = 3000

server.get('/', (req, res)=>{
    res.send("simple res")
})

server.listen(puerto, ()=>{
    console.log("Servidor activo en puerto: ", puerto)
})