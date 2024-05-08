import { Router } from "express";
import Controller from "../Controladores/Controller.js"


const router = Router()

router.get('/', Controller.getUsers)
router.get('/a', Controller.decirWena)
router.get('/equipos',Controller.getTeams)
router.get('/equiposludopatasentorneo',Controller.getEquiposTorneos)

router.post('/notificacion', Controller.postNotificacion)
router.post('/decision', Controller.decision)
router.post('/sendn', Controller.enviarNotificacion)
router.post('/torneo', Controller.postBases)
router.post('/insertTorneoEquipo', Controller.insertarEquipoTorneo)
router.post('/crearTorneo', Controller.postTorneo)
router.post('/equipos', Controller.getEquipo)
router.post('/getTorneo', Controller.getTorneo)


export default router