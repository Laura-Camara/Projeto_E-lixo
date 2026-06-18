import { criarErro } from "../middlewares/errorMiddleware.js";
import empresaRepository from "../repositories/empresaRepository.js";
import { empresaResponseDTO } from "../dtos/empresaDto.js";

export const listarEmpresas = async () => {
    const empresas = await empresaRepository.findAll();

    return empresas.map(e => empresaResponseDTO(e));
};

export const buscarEmpresaPorId = async (id) => {
    const empresa = await empresaRepository.findById(id);

    if (!empresa) {
        throw criarErro("Empresa não encontrada.", 404);
    } 

    return empresaResponseDTO(empresa);
};

export const criarEmpresa = async(dados) => {
    const empresaExistente = await empresaRepository.findByEmail(dados.email);

    if(empresaExistente) {
        throw criarErro("Este e-mail já está cadastrado.", 409)
    }

    const roleDefined = dados.role || 'empresa';
    
    const dadosParaSalvar = {...dados, role: roleDefined}

    const novaEmpresa = await empresaRepository.createEmpresa(dadosParaSalvar);

    return empresaResponseDTO(novaEmpresa);
};

export const atualizarPatchEmpresa = async(id, dados) => {
    const empresaAtualizada = await empresaRepository.updateEmpresa(id, dados)

    if(!empresaAtualizada === -1) {
        throw criarErro("Empresa não encontrada.", 404);
    } 

    return empresaResponseDTO(empresaAtualizada);
};

export const deleteEmpresa = async(id) => {
    const deleted = await empresaRepository.removeEmpresa(id);

    if(!deleted) {
        throw criarErro("Empresa não encontrada.", 404);
    }
    return true;
}

export default {listarEmpresas, buscarEmpresaPorId, criarEmpresa, atualizarPatchEmpresa, deleteEmpresa}