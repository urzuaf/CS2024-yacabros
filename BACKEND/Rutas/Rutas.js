import { Router } from "express";
import Controller from "../Controladores/Controller.js"

const router = Router()

router.get('/', Controller.getUsers)
router.get('/a', Controller.decirWena)
router.post('/notificacion', Controller.postNotificacion)
router.post('/decision', Controller.decision)
router.post('/sendn', Controller.enviarNotificacion)
router.post('/torneo', Controller.postBases)
router.post('/crearTorneo', Controller.postTorneo)
export default router