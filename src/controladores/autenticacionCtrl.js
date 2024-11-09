
import jwt from 'jsonwebtoken' // Importar jsonwebtoken correctamente
import bcrypt from 'bcrypt' // Importar bcryptjs correctamente
import {conmysql} from '../db.js' // Asegurarse de que la conexión a la base de datos está correctamente importada

const SECRET_KEY = 'miClaveSecreta';

// Inicio de sesión
export const login = async (req, res) => {
    const { usr_usuario, usr_clave } = req.body;
    try {
        const user = await conmysql('usuarios').where({ usr_usuario }).first();

        if (!user || !(await bcrypt.compare(usr_clave, user.usr_clave))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user.usr_id, usr_usuario: user.usr_usuario }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Middleware para verificar el token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.user = decoded;
        next();
    });
};