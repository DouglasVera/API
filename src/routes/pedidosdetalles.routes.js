import { Router } from 'express'
import { getPedidosDetalles, getPedidosDetallesxid, postPedidosDetalles, putPedidosDetalles, patchPedidosDetalles, deletePedidosDetalles } from '../controladores/pedidosdetallesCtrl.js'

const router = Router()

// Armar nuestras rutas
router.get('/pedidosdetalles', getPedidosDetalles)
router.get('/pedidosdetalles/:id', getPedidosDetallesxid)
router.post('/pedidosdetalles', postPedidosDetalles)
router.put('/pedidosdetalles/:id', putPedidosDetalles)
router.patch('/pedidosdetalles/:id', patchPedidosDetalles)
router.delete('/pedidosdetalles/:id', deletePedidosDetalles)

export default router