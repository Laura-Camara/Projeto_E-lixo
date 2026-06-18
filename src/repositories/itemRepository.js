import ItemUser from "../models/itemUser.js";

export const create = async(dadosParaSalvar) => {
    
    return await ItemUser.create(dadosParaSalvar);
}

export const findAll =  async() => {

    return await ItemUser.find({}).populate('userId', 'nome email');
};

export const findById = async(id) => {
    
    return await ItemUser.findById(id).populate('userId', 'nome email');
};
//.populate('userId', 'nome email'). O Mongoose automaticamente transforma 
// o userId (que era só uma string de ID) em um objeto contendo _id, nome e email.

export const findDuplicate = async(filtros) => {
    
    return await ItemUser.findOne(filtros)
}

export const findByUserId = async(userId) => {

    const idLimpo = userId.userid || userId.userId || userId

    return await ItemUser.find({userId: idLimpo});
}

export const updateStatus = async(id, novoStatus) => {
    
    return await ItemUser.findByIdAndUpdate(
        id,
        {status: novoStatus},
        {new: true, runValidators: true}
    );
};

export const update = async(id, dadosParaAtualizar) => {
    return await ItemUser.findByIdAndUpdate(
        id,
        {$set: dadosParaAtualizar},
        {new: true, runValidators: true} //{ new: true } retorna o documento já atualizado
    ); //{ runValidators: true } garante que o Mongoose valide o Enum da condição (ex: 'sucata') na edição
}

export const remove = async(id) => {
    const result = await ItemUser.findByIdAndDelete(id);

    return result ? true : false;
}

export default {create, findAll, findById, findDuplicate, findByUserId, updateStatus, update, remove};