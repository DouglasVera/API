import { conmysql } from '../db.js'

export const getPedidosDetalles = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle')
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar detalles de pedidos" })
    }
}

export const getPedidosDetallesxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id])
        if (result.length <= 0) return res.status(404).json({ message: "Detalle de pedido no encontrado" })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const postPedidosDetalles = async (req, res) => {
    try {
        const { ped_id, prod_id, det_cantidad, det_precio } = req.body

        // Validar pedido
        const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id])
        if (pedido.length <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

        // Validar producto
        const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id])
        if (producto.length <= 0) return res.status(404).json({ message: "Producto no encontrado" })

        const [rows] = await conmysql.query('INSERT INTO pedidos_detalle (ped_id, prod_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)', [ped_id, prod_id, det_cantidad, det_precio])
        res.json({ id: rows.insertId })
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const putPedidosDetalles = async (req, res) => {
    try {
        const { ped_id, prod_id, det_cantidad, det_precio } = req.body

        // Validar pedido
        const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id])
        if (pedido.length <= 0) return res.status(404).json({ message: "Pedido no encontrado" })

        // Validar producto
        const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id])
        if (producto.length <= 0) return res.status(404).json({ message: "Producto no encontrado" })

        const [result] = await conmysql.query('UPDATE pedidos_detalle SET ped_id = ?, prod_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?', [ped_id, prod_id, det_cantidad, det_precio, req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Detalle de pedido no encontrado" })
        
        const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const patchPedidosDetalles = async (req, res) => {
    try {
        const { ped_id, prod_id, det_cantidad, det_precio } = req.body

        // Validar pedido si se proporciona ped_id
        if (ped_id) {
            const [pedido] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [ped_id])
            if (pedido.length <= 0) return res.status(404).json({ message: "Pedido no encontrado" })
        }

        // Validar producto si se proporciona prod_id
        if (prod_id) {
            const [producto] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [prod_id])
            if (producto.length <= 0) return res.status(404).json({ message: "Producto no encontrado" })
        }

        const [result] = await conmysql.query('UPDATE pedidos_detalle SET ped_id = IFNULL(?, ped_id), prod_id = IFNULL(?, prod_id), det_cantidad = IFNULL(?, det_cantidad), det_precio = IFNULL(?, det_precio) WHERE det_id = ?', [ped_id, prod_id, det_cantidad, det_precio, req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Detalle de pedido no encontrado" })
        
        const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const deletePedidosDetalles = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM pedidos_detalle WHERE det_id = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({ message: "No se pudo eliminar el detalle del pedido" })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}