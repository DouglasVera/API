import { Router } from 'express'
import {login,verifyToken} from '../controladores/autenticacionCtrl.js'

const router = Router()

// Ruta para el registro
//router.post('/register', authController.register);

// Ruta para el login
router.post('/login', login);

// Ruta protegida de ejemplo
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso a ruta protegida', user: req.user });
});

export default router