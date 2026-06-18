import userRepository from "../repositories/userRepository.js";
import { userResponseDTO } from "../dtos/userDto.js";
import { criarErro } from "../middlewares/errorMiddleware.js";

export const listarUsers = async () => {
    const users = await userRepository.findAll();
    return users.map(user => userResponseDTO(user))
};

export const buscarUserPorId = async (id) => {
    const user = await userRepository.findById(id)
    if (!user) {
        throw criarErro("Usuário não encontrado.", 404);
    } 
    return userResponseDTO(user);
};

export const criarUser = async(dados) => {
    const userExistente = await userRepository.findByEmail(dados.email)

    if(userExistente) {
        throw criarErro("Este e-mail já está cadastrado.", 409)
    }

    const roleDefined = dados.role || 'user';

    const dadosParaSalvar = {...dados, role: roleDefined}

    const novoUser = await userRepository.createUser(dadosParaSalvar);

    return userResponseDTO(novoUser);
};

export const atualizarPatchUser = async(id, dados) => {
    const userAtualizado = await userRepository.updateUser(id, dados)

    if(!userAtualizado) {
        throw criarErro("Usuário não encontrado.", 404);
    } 
    return userResponseDTO(userAtualizado);
};

export const deleteUser = async(id) => {
    const deleted = await userRepository.removeUser(id);

    if(!deleted) {
        throw criarErro("Usuário não encontrado.", 404);
    }
    return true;
}

export default {listarUsers, buscarUserPorId, criarUser, atualizarPatchUser, deleteUser}