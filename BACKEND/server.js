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
  const { nombre, email, password,descripcion} = req.body;
  const fnacimiento = '2001-10-21';
  const rol = 'usuario';
  console.log(req.body)

  try {
      const query = {
          text: 'UPDATE usuario SET username = $1, descripcion = $2, password = $3 WHERE email = $4',
          values: [nombre,descripcion,password,email],
      };

      const result = await db.query(query);
      res.status(201).json(result.rows[0]);
  } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para el inicio de sesión
server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const query = {
    text: 'SELECT * FROM usuario WHERE email = $1 AND password = $2',
    values: [email, password],
  };

  try {
    const result = await db.query(query);
    console.log(result.rows);

    // Verificar si se encontró un usuario con el email y contraseña proporcionados
    const usuario = result.rows[0];
    const rol = usuario.rol; // Guardar el rol del usuario en una variable
    console.log(rol);
    
    res.status(200).json({ success: true, rol });
  } catch (error) {
    console.error('Error al buscar usuario en la base de datos:', error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

// Agrega participantes a la tabla integrante
server.post('/participantes', async (req, res) => {
  const participantes = req.body.participantes; // Se espera que req.body contenga un arreglo de objetos {nombre, equipo}
  console.log(participantes);// Imprimir los participantes recibidos en la consola
  
  try {
      // Iterar sobre cada participante y realizar una inserción individual en la base de datos
      for (const participante of participantes) {
          const { nombre, equipo } = participante;// Extraer el nombre y equipo de cada participante

          const query = {
              text: 'INSERT INTO integrante(nombre, equipo) VALUES($1, $2) RETURNING id', // Consulta para insertar un participante con su equipo y retornar el ID generado
              values: [nombre, equipo], // Pasar el nombre y equipo como valores
          };

          const result = await db.query(query);// Ejecutar la consulta y guardar el resultado
          console.log('ID generado:', result.rows[0].id); // Imprime el ID generado para referencia
          console.log('Participante registrado:', nombre);
      }
    
      res.status(201).json({ message: 'Participantes registrados correctamente' });
  } catch (error) {
      console.error('Error al registrar los participantes:', error);
      res.status(500).json({ error: 'Error al registrar los participantes' });
  }
});

// Editar el nombre de un integrante por su ID
server.put('/participantes/:id', async (req, res) => {
  const id = req.params.id; // Se espera que req.params contenga el ID del integrante
  const { NewNombre } = req.body; // Se espera que req.body contenga el nuevo nombre del integrante
  
  try {
      const query = {
          text: 'UPDATE integrante SET nombre = $1 WHERE id = $2', // Consulta para actualizar el nombre del integrante por su ID
          values: [NewNombre, id],
      };

      await db.query(query);// Ejecutar la consulta
      console.log('Nombre actualizado:', NewNombre);

      res.status(200).json({ message: 'Nombre del integrante actualizado correctamente' });
  } catch (error) {
      console.error('Error al actualizar el nombre del integrante:', error);
      res.status(500).json({ error: 'Error al actualizar el nombre del integrante' });
  }
});

// Borrar un integrante por su ID
server.delete('/participantes/:id', async (req, res) => {
  const id = req.params.id; // Se espera que req.params contenga el ID del integrante a eliminar
  
  try {
      const query = {
          text: 'DELETE FROM integrante WHERE id = $1', // Consulta para eliminar un integrante por su ID
          values: [id],
      };

      await db.query(query);// Ejecutar la consulta
    
      res.status(200).json({ message: 'Integrante eliminado correctamente' });
  } catch (error) {
      console.error('Error al eliminar el integrante:', error);
      res.status(500).json({ error: 'Error al eliminar el integrante' });
  }
});