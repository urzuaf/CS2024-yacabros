import Queries from '../Queries/Queries.js'
import db from '../DB/dbconnect.js'

const getUsers = (req, res) => {
    db.query(Queries.getAllUsers, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const getEquiposTorneos = (req, res) =>{
    const {id} = req.body
    //queremos solo traer los equipos de un torneo determinado, no todos.
    db.query({text:Queries.getEquipoTorneo, values : [id]}, (error, result)=>{
        if(error) throw error
        res.status(200).json(result.rows)
    })

}


const getTeams =(req,resp) =>{
    db.query(Queries.getAllTeams,(error,result)=>{
        if(error) throw error
        resp.status(200).json(result.rows)
    })
}
  
const postNotificacion = (req, res) => {
    const { email } = req.body
    db.query({ text: Queries.getNotificacion, values: [email] }, (error, results) => {

        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const decision = (req, res) => {
    const { id, des } = req.body
    if (des) {
        db.query({ text: Queries.aceptarNotificacion, values: [id] }, (error, results) => {
            if (error) throw error
            res.status(200)
        })
    }
    else {
        db.query({ text: Queries.rechazarNotificacion, values: [id] }, (error, results) => {
            if (error) throw error
            res.status(200)
        })
    }
}

const enviarNotificacion = (req, res) => {
    const { desc, emisor, destinatario } = req.body
    db.query({ text: Queries.sendNotificacion, values: [desc, emisor, destinatario] }, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const postBases = (req, res) => {
    const { id, bases } = req.body
    
    db.query({ text: Queries.updateBases, values: [bases, id] }, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const insertarEquipoTorneo = async (req, res) => {
    const { equipo, torneo } = req.body
    console.log({ equipo, torneo })
    let eq, tor;
    //primero verificar que el equipo exista
    db.query({text:Queries.existeEquipo, values:[equipo]}, (error, results)=>{
        if(error) throw error
        if(results.rows.length <= 0) {
            return res.sendStatus(400)
            
        }
        // obtener id de torneo y equipo mediante nombre

        db.query({ text: Queries.getEquipoFromName, values: [equipo] }, (error, results) => {
            if (error) throw error
            console.log('resultados: ', results.rows)
            eq = results.rows[0]
            console.log({ eq })
            
            db.query({ text: Queries.getTorneoFromName, values: [torneo] }, (error, results) => {
                if (error) throw error
                console.log('resultadow 2', results.rows)
                tor = results.rows[0]
                console.log({ tor, eq })
                
                // comprobar que la relacion no exista de antemano
                db.query({ text: Queries.existeEquipoenTorneo, values: [eq.id, tor.id] }, (error, results) => {
                    if (error) throw error
                    if(results.rows.length > 0){
                        return res.sendStatus(400)
                        
                    }
                     
                    // insertar relacion entre equipo y torneo
                    db.query({ text: Queries.insertarTorneoEquipo, values: [eq.id, tor.id] }, (error, results) => {
                        if (error) throw error
                        res.status(200).json(results.rows)
                    })
                })
            })
        })
    })

}


const decirWena = (req, res) => {
    res.send("wena")
}
const postTorneo = (req, res) =>{
    const {nombre, finicio, ftermino, formato, premio, deporte,creador} = req.body
    db.query({text: Queries.insertTorneo, values: [nombre, finicio, ftermino, formato, premio, deporte,creador]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const updateBracket = (req, res) =>{
    const {bracket, torneo} = req.body
    db.query({text: Queries.insetBracket, values: [bracket, torneo]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const getEquipo = (req, res) =>{
    const {staff} = req.body
    db.query({text: Queries.selectEquipo, values: [staff]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })

}
const getTorneo = (req, res) =>{
    const {ntorneo} = req.body
    db.query({text: Queries.getTorneoFromName, values: [ntorneo]}, (error, results)=>{
        if (error) throw error
        res.status(200).json(results.rows)
    })

}


const borrarCol =async (req, res) => {
    const { info } = req.body;

    try {
        if (info !== undefined) {
            // Verificar si la columna ya existe en la tabla equipo_torneo
            const columnExistsQuery = {
                text: `SELECT column_name FROM information_schema.columns WHERE table_name = 'equipo_torneo' AND column_name = $1`,
                values: [info],
            };
            const columnExistsResult = await db.query(columnExistsQuery);

            if (columnExistsResult.rows.length > 0) {
                // La columna  existe, proceder con el borrado
                await db.query({
                    text: `ALTER TABLE equipo_torneo drop COLUMN ${info}`,
                });

                res.status(200).send('Columna borrada correctamente');
            } else {
               
                res.status(400).send('La columna no existe en la tabla equipo_torneo');
            }
        } else {
            // Si no se proporcionó la información adecuada en la solicitud, enviar un código de estado 400 (Bad Request)
            res.status(400).send('No se proporcionó la información necesaria');
        }
    } catch (error) {
        // En caso de que ocurra un error, enviar un código de estado 500 (Internal Server Error) junto con el mensaje de error
        console.log(error);
        res.status(500).send('Error al agregar la columna');
    }
};


const addColEquipoTorneo = async (req, res) => {
    const { info } = req.body;

    try {
        if (info !== undefined) {
            // Verificar si la columna ya existe en la tabla equipo_torneo
            const columnExistsQuery = {
                text: `SELECT column_name FROM information_schema.columns WHERE table_name = 'equipo_torneo' AND column_name = $1`,
                values: [info],
            };

            const columnExistsResult = await db.query(columnExistsQuery);

            if (columnExistsResult.rows.length === 0) {
                // La columna no existe, proceder con la adición
                await db.query({
                    text: `ALTER TABLE equipo_torneo ADD COLUMN ${info} TEXT`,
                });

                // Enviamos una respuesta indicando que se agregó la columna correctamente
                res.status(200).send('Columna agregada correctamente');
            } else {
                // La columna ya existe, enviar un código de estado 400 (Bad Request) indicando que no se puede agregar la columna
                res.status(400).send('La columna ya existe en la tabla equipo_torneo');
            }
        } else {
            // Si no se proporcionó la información adecuada en la solicitud, enviar un código de estado 400 (Bad Request)
            res.status(400).send('No se proporcionó la información necesaria');
        }
    } catch (error) {
        // En caso de que ocurra un error, enviar un código de estado 500 (Internal Server Error) junto con el mensaje de error
        console.log(error);
        res.status(500).send('Error al agregar la columna');
    }
};

const addInfoColClasificatoria = async (req, resp) => {
    const { data } = req.body;

    try {
        for (const row of data) {
            const col = row[2];
            const val = row[1];
            const id = row[0];
            const tor = row[3];
            
            console.log("COL VAL ID TOR: "+col,val,id,tor)

            // Ejecutar la consulta SQL de manera síncrona
            if(col.length>0 && val.length>0 && id.length>0 && tor.length >0 && col!=undefined && val!=undefined && id!=undefined && tor!=undefined)
            {
                await db.query({
                text: `UPDATE equipo_torneo SET ${col} = '${val}' WHERE equipo = ${id} and torneo = ${tor}`,
                });
            }
        }

        // Todas las consultas se han completado con éxito, enviar respuesta
        resp.status(200).send("modificado correctamente");
    } catch (error) {
        // Manejar errores
        console.error(error);
        resp.status(500).send("Error al modificar los datos");
    }
}













export default {
    getUsers,
    decirWena,
    decision,
    postNotificacion,
    enviarNotificacion,
    postBases,
    insertarEquipoTorneo,
    postTorneo,
    getEquipo,
    getTeams,
    getTorneo,
    getEquiposTorneos,
    updateBracket,
    addColEquipoTorneo,
    borrarCol,
    addInfoColClasificatoria
}


