import { conmysql } from '../db.js'

export const getPedidos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos p inner join pedidos_detalle df on p.ped_id=df.ped_id')
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar pedidos" })
    }
}

export const getPedidosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos p inner join pedidos_detalle df on p.ped_id=df.ped_id WHERE p.ped_id = ?', [req.params.id])
        if (result.length <= 0) return res.status(404).json({ message: "Pedido no encontrado" })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const postPedido = async (req, res) => {
    try {
        const { ped_fecha, cli_id, usr_id, ped_estado } = req.body

        // Validar cliente
        const [cliente] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [cli_id])
        if (cliente.length <= 0) return res.status(404).json({ message: "Cliente no encontrado" })

        // Validar usuario
        const [usuario] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [usr_id])
        if (usuario.length <= 0) return res.status(404).json({ message: "Usuario no encontrado" })

        const [rows] = await conmysql.query('INSERT INTO pedidos (ped_fecha, cli_id, usr_id, ped_estado) VALUES (?, ?, ?, ?)', [ped_fecha, cli_id, usr_id, ped_estado])
        res.json({ id: rows.insertId })
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const putPedido = async (req, res) => {
    try {
        const { ped_fecha, cli_id, usr_id, ped_estado } = req.body

        // Validar cliente
        const [cliente] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [cli_id])
        if (cliente.length <= 0) return res.status(404).json({ message: "Cliente no encontrado" })

        // Validar usuario
        const [usuario] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [usr_id])
        if (usuario.length <= 0) return res.status(404).json({ message: "Usuario no encontrado" })

        const [result] = await conmysql.query('UPDATE pedidos SET ped_fecha = ?, cli_id = ?, usr_id = ?, ped_estado = ? WHERE ped_id = ?', [ped_fecha, cli_id, usr_id, ped_estado, req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })
        
        const [rows] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const patchPedido = async (req, res) => {
    try {
        const { ped_fecha, cli_id, usr_id, ped_estado } = req.body

        // Validar cliente si se proporciona cli_id
        if (cli_id) {
            const [cliente] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [cli_id])
            if (cliente.length <= 0) return res.status(404).json({ message: "Cliente no encontrado" })
        }

        // Validar usuario si se proporciona usr_id
        if (usr_id) {
            const [usuario] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [usr_id])
            if (usuario.length <= 0) return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const [result] = await conmysql.query('UPDATE pedidos SET ped_fecha = IFNULL(?, ped_fecha), cli_id = IFNULL(?, cli_id), usr_id = IFNULL(?, usr_id), ped_estado = IFNULL(?, ped_estado) WHERE ped_id = ?', [ped_fecha, cli_id, usr_id, ped_estado, req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Pedido no encontrado" })
        
        const [rows] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}

export const deletePedido = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM pedidos WHERE ped_id = ?', [req.params.id])
        if (rows.affectedRows <= 0) return res.status(404).json({ message: "No se pudo eliminar el pedido" })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor" })
    }
}