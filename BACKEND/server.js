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

// Ruta para el inicio de sesión
server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const query = {
    text: 'SELECT email,username,descripcion,fnacimiento,rol FROM usuario WHERE email = $1 AND password = $2',
    values: [email, password],
  };

  try {
    const result = await db.query(query);
    console.log(result.rows);

    // Verificar si se encontró un usuario con el email y contraseña proporcionados
    const usuario = result.rows;
    const rol = usuario.rol; // Guardar el rol del usuario en una variable
    console.log(rol);
    
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al buscar usuario en la base de datos:', error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

// Ruta para agregar los integrantes de un equipo
server.post('/integrante', async (req, res) => {
  try {
    const { nombre, equipo } = req.body; // Acceder a las propiedades nombre y nombreEquipo del cuerpo de la solicitud
    console.log(nombre, equipo); // Para verificar que estás recibiendo los datos correctamente

    const query = {
      text: 'insert into integrante(nombre, equipo) values($1, $2) RETURNING id',
      values: [nombre, equipo], // Pasar el nombre y equipo como valores
    };

    const result = await db.query(query); // Ejecutar la consulta y guardar el resultado

    // Verificar si se generó un ID y luego imprimirlo
    if (result.rows.length > 0 && result.rows[0].id) {
      console.log('ID generado:', result.rows[0].id);
    } else {
      console.log('No se generó ningún ID');
    }
    res.status(201).json({ message: 'Participantes registrados correctamente' });
  } catch (error) {
    console.error('Error al registrar los participantes:', error);
    res.status(500).json({ error: 'Error al registrar los participantes' });
  }
});


// Editar el nombre de un integrante por su ID
server.put('/integrante', async (req, res) => {
  try {
    const { newNombre, idIntegrante } = req.body;
    console.log(newNombre, idIntegrante); // Para verificar que estás recibiendo los datos correctamente

    const query = {
      text: 'UPDATE integrante SET nombre = $1 WHERE id = $2',// Consulta para cambiar el nombre de un integrante por su ID
      values: [newNombre, idIntegrante],// Pasar el nuevo nombre y el ID del integrante
    };

    await db.query(query); // Ejecutar la consulta

    res.status(201).json({ message: 'nombre cambiado' });
  } catch (error) {
    console.error('Error al cambiar nombre:', error);
    res.status(500).json({ error: 'Error cambiar nombre' });
  }
});

// Borrar un integrante por su ID
server.delete('/integrante', async (req, res) => {  
  try {
      const { idIntegrante2 } = req.body; // Acceder al ID del integrante a eliminar
      console.log(idIntegrante2); // Para verificar que estás recibiendo el ID correctamente
      const query = {
          text: 'DELETE FROM integrante WHERE id = $1', // Consulta para eliminar un integrante por su ID
          values: [idIntegrante2],
      };
      await db.query(query);// Ejecutar la consulta

      res.status(200).json({ message: 'Integrante eliminado correctamente' });
  } catch (error) {
      console.error('Error al eliminar el integrante:', error);
      res.status(500).json({ error: 'Error al eliminar el integrante' });
  }
});