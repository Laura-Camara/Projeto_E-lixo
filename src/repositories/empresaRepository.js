import db from '../data/database.js';
//import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'
import bcrypt from 'bcrypt';
import Empresa from '../models/empresaModel.js'

export const findAll = async () => {

    return await Empresa.find({});
};

export const findById = async (id) => {

    return await Empresa.findById(id);
};

export const createEmpresa = async (dados) => {

    const {senha, ...restoDosDados} = dados;

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds)

    const novaEmpresa = { 
        senha: senhaHash, 
        ...restoDosDados };

    return await Empresa.create(novaEmpresa) ;
};

export const updateEmpresa = async(id, dados) => {
    
    return await Empresa.findByIdAndUpdate(id, dados, {new: true, runValidators: true});
};

export const removeEmpresa = async(id) => {
    
    const result = await Empresa.findByIdAndDelete(id);

    return result ? true : false;
};

export const findByEmail = async(email) => {

    return await Empresa.findOne({email: email})
};

export const findByLogin = async(login) => {

    return await Empresa.findOne({login: login});
}

export default {findAll, findById, createEmpresa, updateEmpresa, removeEmpresa, findByEmail, findByLogin};