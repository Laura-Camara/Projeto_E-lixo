import db from '../data/database.js';
//import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/userModel.js';

export const findAll = async () => {

    return await User.find({});
};

export const findById = async (id) => {

    return await User.findById(id);
};

export const createUser = async (dados) => {

    const {senha, ...restoDosDados} = dados;

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds)

    const novoUser = { 
        senha: senhaHash, 
        ...restoDosDados };

    return await User.create(novoUser);
};

export const updateUser = async(id, dados) => {

    return await User.findByIdAndUpdate(id, dados, {new: true, runValidators: true});
};

export const removeUser = async(id) => {

    const result = await User.findByIdAndDelete(id);

    return result ? true : false;   
};

export const findByEmail = async(email) => {

    return await User.findOne({email: email});
};

export const findByLogin = async(login) => {

    return await User.findOne({login: login});
}

export default {findAll, findById, createUser, updateUser, removeUser, findByEmail, findByLogin};