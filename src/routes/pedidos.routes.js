import { Router } from 'express'
import { getPedidos, getPedidosxid, postPedido, putPedido, patchPedido, deletePedido } from '../controladores/pedidosCtrl.js'

const router = Router()

// Armar rutas
router.get('/pedidos', getPedidos)
router.get('/pedidos/:id', getPedidosxid)
router.post('/pedidos', postPedido)
router.put('/pedidos/:id', putPedido)
router.patch('/pedidos/:id', patchPedido)
router.delete('/pedidos/:id', deletePedido)

export default router