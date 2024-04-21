import express from "express";
import cors from "cors";
import db from "./DB/dbconnect.js";
import router from "./Rutas/Rutas.js";

const server = express()
const puerto = 3000

server.use(express.json())
server.use(cors());

//Separamos las rutas a otro archivo para evitar que el archivo server.js crezca mucho
server.use(router)

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

//peticion para torneos
server.get('/getTorneos', async(req,res)=>{
  db.query("select * from torneo",(error,result)=>{
    if(error) throw error;
    
    res.status(200).json(result.rows);
    
  })
})



server.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    const descripcion = 'descripcion';
    const fnacimiento = '2001-10-21';
    const rol = 'usuario';
    console.log(nombre)

    try {
        const query = {
            text: 'INSERT INTO usuario(email, username, password, descripcion, fnacimiento, rol) VALUES($1, $2, $3, $4, $5, $6)',
            values: [email, nombre, password, descripcion, fnacimiento,rol],
        };

        const result = await db.query(query);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

server.post('/editData', async (req, res) => {
  const { nombre, descripcion,emisor,password} = req.body;
  console.log(req.body)
  
  //se inicia la query
  let queryText = 'UPDATE usuario SET ';
  let values = [];
  let contador = 0;

  // se construye la query
  if (nombre !== '') {
    queryText += 'username = $'+(contador+1)+', ';
    values.push(nombre);
    contador++;
  }
  if (descripcion !== '') {
    queryText += 'descripcion = $'+(contador+1)+', ';
    values.push(descripcion);
    contador++;
  }
  if (password !== '') {
    queryText += 'password = $'+(contador+1)+', ';
    values.push(password);
    contador++;
  }

  // se añade where
  queryText += 'WHERE email = $'+(contador+1);
  values.push(emisor);

  // se encarga de eliminar la coma anterior al where para evitar errores de sintaxis
  let ultimacoma = queryText.lastIndexOf(',');
  let newqueryText = queryText.substring(0, ultimacoma) + queryText.substring(ultimacoma + 1);
  console.log(newqueryText);

  // prepara la query
  const query = {
  text: newqueryText,
  values: values,
  };

  try {
  const result = await db.query(query);
  res.status(201).json(result.rows[0]);
  }catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  });

  server.post('/integrante', async (req, res) => {
    try {
      const { nombre, equipo } = req.body;
      console.log(nombre, equipo);
  
      const query = {
        text: 'insert into integrante(nombre, equipo) values($1, $2) RETURNING id',
        values: [nombre, equipo],
      };
  
      const result = await db.query(query);
  
      if (result.rows.length > 0 && result.rows[0].id) {
        console.log('ID generado:', result.rows[0].id);
        res.status(201).json({ success: true, message: 'Participante registrado correctamente' });
      } else {
        console.log('No se generó ningún ID');
        res.status(500).json({ success: false, error: 'Error al registrar el participante' });
      }
    } catch (error) {
      console.error('Error al registrar el participante:', error);
      res.status(500).json({ success: false, error: 'Error al registrar el participante' });
    }
  });
  
  server.put('/integrante', async (req, res) => {
    try {
      const { newNombre, idIntegrante } = req.body;
      console.log(newNombre, idIntegrante);
  
      const query = {
        text: 'UPDATE integrante SET nombre = $1 WHERE id = $2',
        values: [newNombre, idIntegrante],
      };
  
      await db.query(query);
  
      res.status(200).json({ success: true, message: 'Nombre del integrante actualizado correctamente' });
    } catch (error) {
      console.error('Error al cambiar nombre:', error);
      res.status(500).json({ success: false, error: 'Error al cambiar nombre del integrante' });
    }
  });
  
  server.delete('/integrante', async (req, res) => {
    try {
      const { idIntegrante2 } = req.body;
      console.log(idIntegrante2);
  
      const query = {
        text: 'DELETE FROM integrante WHERE id = $1',
        values: [idIntegrante2],
      };
  
      await db.query(query);
  
      res.status(200).json({ success: true, message: 'Integrante eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el integrante:', error);
      res.status(500).json({ success: false, error: 'Error al eliminar el integrante' });
    }
  });
  