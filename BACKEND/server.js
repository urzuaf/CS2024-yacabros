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
    const { email, password } = req.body; //extrae el email y la contraseña
  
    try {
      const query = 'SELECT * FROM usuario WHERE email = $1 AND password = $2'; //selecciona dentro de la bd el email y la contraseña que se ingresaron
      const result = await pool.query(query, [email, password]); //guarda el resultado de los datos
  
      if (result.rows.length > 0) { //valida que encontro un usuario con lo ingresado en la bd
        const user = result.rows[0]; //toma el primer usuario de la lista
        // Aquí puedes verificar el rol del usuario
        let mensajeRol; 
        switch (user.rol) { //revisa el rol de usuario y lo guarda en mensajeRol
          case 'usuario':
            mensajeRol = 'Usuario';
            break;
          case 'staff':
            mensajeRol = 'Staff';
            break;
          case 'creador':
            mensajeRol = 'Creador';
            break;
          case 'admin':
            mensajeRol = 'Administrador';
            break;
          default:
            mensajeRol = 'Desconocido';
            break;
        }
        res.send(`Bienvenido ${user.username}, rol: ${mensajeRol}`); //envia un mensaje de bienvenida con el nombre de usuario y su rol
      } else {
        res.send('Credenciales incorrectas. Por favor, inténtelo de nuevo.'); //si no encuentra un usuario con los datos ingresados envia un mensaje de error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error interno del servidor');
    }
});
  
