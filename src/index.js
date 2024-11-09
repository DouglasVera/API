import app from './app.js'
import {PORT} from './config.js'

app.listen(PORT);//puerto 3000
console.log('Servidor ejecutandose en el puerto ',PORT)