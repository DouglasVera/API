import { Router } from 'express'
import { getUsuarios,getUsuariosxid,postUsuarios,putUsuarios,patchUsuarios,deleteUsuarios } from '../controladores/usuariosCtrl.js'

const router=Router()


//Armar nuestras rutas
router.get('/usuarios',getUsuarios)//select 
router.get('/usuarios/:id',getUsuariosxid)//select x id
router.post('/usuarios',postUsuarios)//insert
router.put('/usuarios/:id',putUsuarios)//update
router.patch('/usuarios/:id',patchUsuarios)//update
router.delete('/usuarios/:id',deleteUsuarios)//delete

export default router