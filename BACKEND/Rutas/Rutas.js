import { Router } from "express";
import Controller from "../Controladores/Controller.js"


const router = Router()

router.get('/', Controller.getUsers)
router.get('/a', Controller.decirWena)
router.get('/equipos',Controller.getTeams)
router.post('/equiposludopatasentorneo',Controller.getEquiposTorneos)

router.post('/notificacion', Controller.postNotificacion)
router.post('/decision', Controller.decision)
router.post('/sendn', Controller.enviarNotificacion)
router.post('/torneo', Controller.postBases)
router.post('/insertTorneoEquipo', Controller.insertarEquipoTorneo)
router.post('/crearTorneo', Controller.postTorneo)
router.post('/equipos', Controller.getEquipo)
router.post('/getTorneo', Controller.getTorneo)
router.post('/updateBracket', Controller.updateBracket)

router.post('/addColClasificatoria',Controller.addColEquipoTorneo)
router.post('/delColClasificatoria',Controller.borrarCol)
router.post('/addInfoColClasificatoria',Controller.addInfoColClasificatoria)

router.post('/getUserByEmail', Controller.getUserByEmail);


export default router