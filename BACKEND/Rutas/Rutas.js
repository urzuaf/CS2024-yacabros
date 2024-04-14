import { Router } from "express";
import Controller from "../Controladores/Controller.js"

const router = Router()

router.get('/', Controller.getUsers)
router.get('/a', Controller.decirWena)
export default router