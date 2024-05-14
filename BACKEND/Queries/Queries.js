const getAllUsers = "select * from usuario"
const getUserByEmail = "select * from usuario where email = $1"
const deleteUser = "delete from usuario where email = $1"
const getNotificacion = "select id, email, username,solicitud.descripcion, visto, estado, emisor  from solicitud, usuario where usuario.email = solicitud.destinatario and usuario.email = $1"
const aceptarNotificacion = "update solicitud set estado = 'aceptado', visto=true where id = $1"
const rechazarNotificacion = "update solicitud set estado = 'rechazado', visto=true where id = $1"
const sendNotificacion = "insert into solicitud (descripcion, visto, estado, emisor, destinatario) values ($1, false, 'pendiente', $2, $3)"
const updateBases = "update torneo set bases = $1 where id = $2"
const getAllTeams = "select * from equipo"

const getUsuarioFromEmail= "select email, username, descripcion, fnacimiento, rol from usuario where email = $1"
const getTorneoFromEmail= "select email, nombre, bases, finicio, ftermino, premio, deporte, formato from usuario join torneo on usuario.email = torneo.creador where usuario.email = $1"
const getTorneoFromName = "select * from torneo where nombre = $1"
const getEquipoFromEmail= "select email, nombre, descripcion, deporte from usuario join torneo on usuario.email = torneo.creador where usuario.email = $1"
const getEquipoFromName = "select * from equipo where nombre = $1"
const insertarTorneoEquipo = "insert into equipo_torneo (equipo, torneo) values ($1,$2)"

const existeEquipoenTorneo = "select * from equipo_torneo where equipo = $1 and torneo = $2"
const existeEquipo = "select * from equipo where nombre = $1"
const insertTorneo = "insert into torneo (nombre, bases, finicio, ftermino, formato, premio, deporte,creador ) values ($1,'sin base', $2, $3, $4, $5, $6, $7)"
const selectEquipo = "select * from equipo where staff = $1"

const getEquipoTorneo = "select * from equipo_torneo join equipo on equipo_torneo.equipo=equipo.id where equipo_torneo.torneo = $1"

const insetBracket = "update torneo set bracketplaceholder = $1 where nombre = $2"

const addColEquipoTorneo = "alter table equipo_torneo add $1 text; update equipo_torneo set $1 = '';" 


export default ({

    getAllUsers,
    getUserByEmail,
    deleteUser,
    getNotificacion,
    aceptarNotificacion,
    rechazarNotificacion,
    sendNotificacion,
    updateBases,
    getUsuarioFromEmail,
    getUsuarioFromEmail,
    getTorneoFromEmail,
    getEquipoFromEmail,
    insertarTorneoEquipo,
    getEquipoFromName,
    getTorneoFromName,
    insertTorneo,
    selectEquipo,
    getAllTeams,
    getEquipoTorneo,
    insetBracket,
    existeEquipo,
    existeEquipoenTorneo,
    addColEquipoTorneo


})