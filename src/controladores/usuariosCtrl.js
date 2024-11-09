import {conmysql} from '../db.js'
import bcrypt from 'bcrypt'

export const getUsuarios=async(req,res)=>{
    try {
        const [result] = await conmysql.query(' select * from usuarios ')
        res.json(result)
    } catch (error) {
        return res.status(500).json({
            message:"Error al consultar Usuarios"
        })
    }
}

export const getUsuariosxid=async(req,res)=>{
    try {
        const [result] = await conmysql.query(' select * from usuarios where usr_id=?',[req.params.id])
        if(result.length<=0) return res.status(404).json({
            usr_id:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}
//esta es la parte original
/*
export const postUsuarios=async(req,res)=>{
    try {
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        const [rows]= await conmysql.query(' insert into usuarios(usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo)  values(?,?,?,?,?,?)',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])
        
        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}
*/
//esta es la parte con la de la incriptacion de contraseña

export const postUsuarios=async(req,res)=>{
    try {
        //const bcrypt = require('bcrypt')
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        const saltRounds = 10;
        // Encriptar una clave
        const contrasena = await bcrypt.hash(usr_clave, saltRounds);
        const [rows]= await conmysql.query(' insert into usuarios(usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo)  values(?,?,?,?,?,?)',
            [usr_usuario, contrasena, usr_nombre, usr_telefono, usr_correo, usr_activo])
        
        res.send({
            id:rows.insertId
        })
       
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}

export const putUsuarios=async(req,res)=>{
    try {
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        //console.log(cli_nombre)
        const [result]= await conmysql.query(' update usuarios set usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? where usr_id=? ',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
        if(result.affectedRows<=0)return res.status(404).json({//esta parte es cueles las partes afextadas
            message:"Usuarios no encontrado"
        })
        const [rows]= await conmysql.query('select * from usuarios where urs_id=?',[id])
        res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}

export const patchUsuarios=async(req,res)=>{
    try {
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} = req.body
        //console.log(cli_nombre)
        const [result]= await conmysql.query(' update usuarios set usr_usuario=IFNULL(?,usr_usuario), usr_clave=IFNULL(?,usr_clave), usr_nombre=IFNULL(?,usr_nombre), usr_telefono=IFNULL(?,usr_telefono), usr_correo=IFNULL(?,usr_correo), usr_activo=IFNULL(?,usr_activo) where usr_id=? ',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo,id])
        if(result.affectedRows<=0)return res.status(404).json({//esta parte es cueles las partes afextadas
            message:"Producto no encontrado"
        })
        const [rows]= await conmysql.query('select * from usuarios where usr_id=? ',[id])
        res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({message:'Error del lado del servidor'})
    }
}

export const deleteUsuarios=async(req,res)=>{
    try {
        const [rows]= await conmysql.query('delete from usuarios where usr_id=? ',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No se pudo eliminar al Productos"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"error del lado del servidor"})
    }
}