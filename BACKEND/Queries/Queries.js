const getAllUsers = "select * from usuario"
const getUserByEmail = "select * from usuario where email = $1"
const deleteUser = "delete from usuario where email = $1"
const getNotificacion = "select id, email, username,solicitud.descripcion, visto, estado, emisor  from solicitud, usuario where usuario.email = solicitud.destinatario and usuario.email = $1"
const aceptarNotificacion = "update solicitud set estado = 'aceptado', visto=true where id = $1"
const rechazarNotificacion = "update solicitud set estado = 'rechazado', visto=true where id = $1"
const sendNotificacion = "insert into solicitud (descripcion, visto, estado, emisor, destinatario) values ($1, false, 'pendiente', $2, $3)"
const updateBases = "update torneo set bases = $1 where id = $2"
const insertTorneo = "insert into torneo (nombre, bases, finicio, ftermino, formato, premio, deporte,creador ) values ($1,'sin base', $2, $3, $4, $5, $6, $7)"
const selectEquipo = "select * from equipo where staff = $1"
export default ({
    getAllUsers,
    getUserByEmail,
    deleteUser,
    getNotificacion,
    aceptarNotificacion,
    rechazarNotificacion,
    sendNotificacion,
    updateBases,
    insertTorneo,
    selectEquipo
})