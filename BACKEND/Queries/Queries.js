const getAllUsers = "select * from usuario"
const getUserByEmail = "select * from usuario where email = $1"
const deleteUser = "delete from usuario where email = $1"
const getNotificacion = "select id, email, username,solicitud.descripcion, visto, estado, emisor  from solicitud, usuario where usuario.email = solicitud.destinatario and usuario.email = $1"
const aceptarNotificacion = "update solicitud set estado = 'aceptado', visto=true where id = $1"
const rechazarNotificacion = "update solicitud set estado = 'rechazado', visto=true where id = $1"
const sendNotificacion = "insert into solicitud (descripcion, visto, estado, emisor, destinatario) values ($1, false, 'pendiente', $2, $3)"

export default({
    getAllUsers,
    getUserByEmail,
    deleteUser,
    getNotificacion,
    aceptarNotificacion,
    rechazarNotificacion,
    sendNotificacion
})