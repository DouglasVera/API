import express from 'express'
import cors from 'cors';//importa los paquetes cors paara mostrar el contenido dar permisos
import path from 'path';//captura la carpte
import { fileURLToPath } from 'url'; //rutas donde estan las imagenes

import bodyParser from 'body-parser'
import authRoutes from './routes/autenticacion.routes.js'

import clientesRoutes from './routes/clientes.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import productosRoutes from './routes/productos.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import pedidosdetalleRoutes from './routes/pedidosdetalles.routes.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();
const corsOptions={
    origin:'*', //direccion del dominio del servidor
    methods:['GET','POST','PUT','PATCH','DELETE'],
    Credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());//para que interprete los objetos json
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname,'../uploads')))//aqui es donde se envian las imagenes

//Esta parte es la parte autenticacion
app.use(bodyParser.json());
app.use('/autenticacion.routes.js', authRoutes);

//RUTAS
app.use('/api',clientesRoutes)
app.use('/api',usuariosRoutes)
app.use('/api',productosRoutes)
app.use('/api',pedidosRoutes)
app.use('/api',pedidosdetalleRoutes)
//app.use('/api',authRoutes)

app.use((req,res,next)=>{
    res.status(400).json({
        message:'End point not found'
    })
})

export default app;