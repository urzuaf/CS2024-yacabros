import express from "express";
import cors from "cors";
import db from "./DB/dbconnect.js";
import router from "./Rutas/Rutas.js";

const server = express();
const puerto = 3000;

server.use(express.json());
server.use(cors());

//Separamos las rutas a otro archivo para evitar que el archivo server.js crezca mucho
server.use(router);

server.listen(puerto, () => {
  console.log("Servidor activo en puerto: ", puerto);
});

server.post('/username', async (req,res)=>{
  db.query("select * from usuario",(error,result)=>{
    if (error) {
      console.error('Error al ejecutar la consulta SQL:', error);
      res.status(500).json({ error: 'Error al obtener los datos de usuario' });
      return;
    }
    res.status(200).json(result.rows);
  })
});

//peticion para torneos
server.get('/getTorneos', async(req,res)=>{
  db.query("select * from torneo",(error,result)=>{
    if(error) throw error;
    
    res.status(200).json(result.rows);
    
  })
});

server.post('/getUsername', async (req, res) => {
  const {email} = req.body;
  db.query("select username from usuario where email = $1",[email],(error,result)=>{
  if(error) throw error;
  res.status(200).json(result.rows);
  })
});

server.post('/getRol', async (req, res) => {
  const {email} = req.body;
  db.query("select rol from usuario where email = $1",[email],(error,result)=>{
  if(error) throw error;
  res.status(200).json(result.rows);
})
});

server.post('/getTeam', async (req, res) => {
  const {email} = req.body;
  db.query("select id from equipo where staff = $1",[email],(error,result)=>{
  if(error) throw error;
  res.status(200).json(result.rows);
})
});

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

server.post('/registerTeam', async (req, res) => {
  const { nombreEquipo, descripcion, deporte,email} = req.body;
  console.log(req.body)

  try {
      const query = {
          text: 'INSERT INTO equipo(nombre, descripcion, deporte, staff) VALUES($1, $2, $3, $4)',
          values: [nombreEquipo, descripcion, deporte, email],
      };

      const result = await db.query(query);
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

server.post('/deleteTeam', async (req, res) => {
  const {emisor} = req.body;
  console.log(req.body);
  db.query("DELETE FROM equipo WHERE staff = $1",[emisor],(error,result)=>{
  if(error) throw error;
  res.status(200).json(result.rows);
})
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

server.post('/editDataTeam', async (req, res) => {
  const { nombreEquipo, descripcion,deporte,emisor} = req.body;
  console.log(req.body)
  
  //se inicia la query
  let queryText = 'UPDATE equipo SET ';
  let values = [];
  let contador = 0;

  // se construye la query
  if (nombreEquipo !== '') {
    queryText += 'nombre = $'+(contador+1)+', ';
    values.push(nombreEquipo);
    contador++;
  }
  if (descripcion !== '') {
    queryText += 'descripcion = $'+(contador+1)+', ';
    values.push(descripcion);
    contador++;
  }
  if (deporte !== '') {
    queryText += 'deporte = $'+(contador+1)+', ';
    values.push(deporte);
    contador++;
  }

  // se añade where
  queryText += 'WHERE staff = $'+(contador+1);
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


  server.post('/integrante', async (req, res) => {//registro de integrantes
    try {
      const { nombre, equipo } = req.body;//se obtiene el nombre y el equipo
      console.log(nombre, equipo);//se imprime en consola el nombre y el equipo
  
      const query = {
        text: 'insert into integrante(nombre, equipo) values($1, $2) RETURNING id',//se inserta el nombre y el equipo en la tabla integrante
        values: [nombre, equipo],//se inserta el nombre y el equipo en la tabla integrante
      };
  
      const result = await db.query(query);//se ejecuta la query
  
      if (result.rows.length > 0 && result.rows[0].id) {
        const id = result.rows[0].id;
        console.log('ID generado:', id);
        res.status(201).json({ success: true, message: `Participante registrado correctamente. ID: ${id}, Nombre: ${nombre}` });//se envia un mensaje de exito
      } else {
        console.log('No se generó ningún ID');
        res.status(500).json({ success: false, error: 'Error al registrar el participante' });
      }
    } catch (error) {
      console.error('Error al registrar el participante:', error);
      res.status(500).json({ success: false, error: 'Error al registrar el participante' });
    }
  });
  
  server.put('/integrante', async (req, res) => {//actualizar nombre de integrante
    try {
      const { newNombre, idIntegrante } = req.body;//se obtiene el nuevo nombre y el id del integrante
      console.log(newNombre, idIntegrante);//se imprime en consola el nuevo nombre y el id del integrante
      const query = {
        text: 'UPDATE integrante SET nombre = $1 WHERE id = $2',//se actualiza el nombre del integrante
        values: [newNombre, idIntegrante],//se actualiza el nombre del integrante
      };
  
      await db.query(query);//se ejecuta la query
  
      res.status(200).json({ success: true, message: `Nombre del integrante actualizado correctamente. \nNuevo Nombre: ${newNombre}` });//se envia un mensaje de exito
    } catch (error) {
      console.error('Error al cambiar nombre:', error);
      res.status(500).json({ success: false, error: 'Error al cambiar nombre del integrante' });
    }
  });
  
  server.delete('/integrante', async (req, res) => {//eliminar integrante
    try {
      const { idIntegrante2 } = req.body;//se obtiene el id del integrante
      console.log(idIntegrante2);//se imprime en consola el id del integrante
  
      // Obtener el nombre del integrante antes de borrarlo
      const queryNombre = {
        text: 'SELECT nombre FROM integrante WHERE id = $1',//se selecciona el nombre del integrante
        values: [idIntegrante2],//se selecciona el nombre del integrante
      };
  
      const resultNombre = await db.query(queryNombre);//se ejecuta la query
  
      if (resultNombre.rows.length > 0) {
        const nombreIntegrante = resultNombre.rows[0].nombre;
        console.log('Nombre del integrante:', nombreIntegrante);//se imprime en consola el nombre del integrante
  
        const queryBorrar = {
          text: 'DELETE FROM integrante WHERE id = $1',//se elimina el integrante
          values: [idIntegrante2],
        };
  
        await db.query(queryBorrar);
  
        res.status(200).json({ success: true, message: `Integrante eliminado correctamente. Nombre: ${nombreIntegrante}` });//se envia un mensaje de exito
      } else {
        res.status(404).json({ success: false, error: 'Integrante no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el integrante:', error);
      res.status(500).json({ success: false, error: 'Error al eliminar el integrante' });
    }
  });
  
// Ruta para crear un nuevo foro
server.post('/crearForo', async (req, res) => {
  const { titulo, comentario, etiqueta } = req.body; // Añadir el campo etiqueta
  const fechaCreacion = new Date().toISOString().split('T')[0];
  const userEmail = "admin@admin.com"; // Este valor aún se mantiene fijo para simplificar
//valida el correo de la persona que esta llenando el formulario para crear el foro, para ello debe estar el inicio de seccion habilitado donde pueda reconocer el correo
//ya que aun no esta el valor userEmail es un valor fijo que ya exite en la base de datos de la tabla foro

  /*const userEmail = req.user && req.user.email;

  if (!userEmail) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }*/
  
  try {
    // Insertar el nuevo foro con sus etiqueta
    const foroQuery = {
      text: 'INSERT INTO foro (titulo, fecha_creacion, creado_por, etiqueta) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [titulo, fechaCreacion, userEmail, etiqueta]
    };
    const foroResult = await db.query(foroQuery);
    const nuevoForoId = foroResult.rows[0].id;

    if (comentario) {
      const comentarioQuery = {
        text: 'INSERT INTO comentario (texto, autor, pertenece_a) VALUES ($1, $2, $3)',
        values: [comentario, userEmail, nuevoForoId]
      };
      await db.query(comentarioQuery);
    }

    res.status(201).json({ id: nuevoForoId });
  } catch (error) {
    console.error('Error al crear el foro:', error);
    res.status(500).json({ error: 'Error al crear el foro' });
  }
});
