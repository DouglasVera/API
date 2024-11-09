import { Router } from 'express'
import multer from 'multer' //
import { getProductos,getProductosxid,postProductos,putProductos,patchProductos,deleteProductos } from '../controladores/productosCtrl.js'

//configurar multer para almacenar las imagenes
const storage = multer.diskStorage({
    destination:(res,file,cd)=>{
        cd(null,'uploads'); //carpeta donde se guarda las imagenes
    },
    filename:(res,file,cd)=>{
        cd(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({storage});
const router=Router()

//Armar nuestras rutas
router.get('/productos',getProductos)//select 
router.get('/productos/:id',getProductosxid)//select x id
router.post('/productos', upload.single('prod_imagen'), postProductos)//insert incluye el registro de una imagen
router.put('/productos/:id',putProductos)//update
router.patch('/productos/:id', patchProductos)//update
router.delete('/productos/:id', deleteProductos)//delete

export default router