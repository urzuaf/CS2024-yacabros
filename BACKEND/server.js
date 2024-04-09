import express from "express";
import cors from "cors";
import db from "./DB/dbconnect.js";

const server = express()
const puerto = 3000

server.use(express.json())
server.use(cors());

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


server.get('/username', async (req,res)=>{
    db.query("select * from usuario",(error,result)=>{
        if (error) {
            console.error('Error al ejecutar la consulta SQL:', error);
            res.status(500).json({ error: 'Error al obtener los datos de usuario' });
            return;
        }
        res.status(200).json(result.rows);
    })
})

