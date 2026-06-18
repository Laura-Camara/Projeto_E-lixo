import * as itemRepository from '../repositories/itemRepository.js';
import { criarErro } from '../middlewares/errorMiddleware.js';
import { criarItemDTO, respostaItemDTO } from '../dtos/itemDto.js';

const classificarLinhaResiduo = (tipo) => {
    const termo = tipo.toLowerCase().trim();

    if(['notebook', 'computador', 'celular', 'tablet', 'mouse', 'teclado', 'smartphone'].some(t => termo.includes(t))) {
        return 'verde';
    }
    if(['tv', 'televisao', 'monitor', 'som', 'home theater', 'caixa de som'].some(t => termo.includes(t))) {
        return 'marrom';
    }
    if(['geladeira', 'fogao', 'microondas', 'micro-ondas', 'maquina de lavar', 'freezer']. some(t => termo.includes(t))) {
        return 'branca';
    }
    return 'azul';
}

export const criarItem = async (dadosBrutos, userId) => {
    const dadosValidados = criarItemDTO(dadosBrutos);

    const linhaAutomatica = classificarLinhaResiduo(dadosValidados.tipo);

    const cincoMinAtras = new Date(Date.now() - 5 * 60 * 1000);

    const itemDuplicado = await itemRepository.findDuplicate({
        userId,
        ...dadosValidados,
        createdAt: {$gte: cincoMinAtras} //$gte:"Greater Than or Equal". Equivalente a >=. 
    });

    if(itemDuplicado) {
        throw criarErro("Detectamos um envio duplicado. Se você possui mais de um item idêntico, altere a quantidade ou a descrição no formulário.", 
            409);
    }

    const dadosParaSalvar = {
        ...dadosValidados,
        linha: linhaAutomatica,
        userId: userId
    };
    return await itemRepository.create(dadosParaSalvar);
};

export const listarTodosOsItens = async() => {
    
    return await itemRepository.findAll();
}

export const buscarItemPorId = async(id, usuarioLogado) => {
    const item = await itemRepository.findById(id);

    if(!item) {
        throw criarErro("Item não encontrado", 404);
    };

    const idLogado = usuarioLogado.userId || usuarioLogado.userid;
    const donoId = item.userId._id ? item.userId._id.toString() : item.userId.toString();

    if (donoId !== idLogado.toString() && usuarioLogado.role !== 'admin') {
        throw criarErro("Acesso negado. Você não tem permissão para visualizar este item.", 403);
    }

    return respostaItemDTO(item);
};

export const listarItensDoUsuario = async(userId) => {
    const itens = await itemRepository.findByUserId(userId);

    return itens.map(item => respostaItemDTO(item));
};

export const atualizarItem = async(id, dados, userId) => {
    //Busca o item para verificar o status atual e quem é o dono
    const item = await itemRepository.findById(id);
    if(!item) {
        throw criarErro("Item não encontrado", 404);
    }
    //Regra de Segurança: O usuário logado só pode editar os PRÓPRIOS itens
    // Comparamos o ID do dono com o ID de quem está logado
    const donoId = item.userId._id ? item.userId._id.toString() : item.userId.toString();
    if(donoId !== userId.toString()) {
        throw criarErro("Acesso negado. Você não tem permissão para editar este item.", 403);
    }

    if(item.status === 'coletado') {
        throw criarErro("Não é possível editar um item que já foi coletado.", 400);
    }

    let dadosAtualizados = {...dados};
    if(dados.tipo) {
        dadosAtualizados.linha = classificarLinhaResiduo(dados.tipo);
    }
    
    return await itemRepository.update(id, dadosAtualizados);
};

export const marcarComoColetado = async(itemId) => {
    const itemAtualizado = await itemRepository.updateStatus(itemId, 'coletado');

    if(!itemAtualizado) {
        throw criarErro("Item não encontrado para atualização de status.", 404);
    }
    return itemAtualizado;
};

export const deleteItem = async(id) => {
    const item = await itemRepository.findById(id);
    if (!item) {
        throw criarErro("Item não encontrado.", 404);
    }

    const idLogado = usuarioLogado.userId || usuarioLogado.userid; // Extrai o ID limpo de quem está logado no token

    //Regra de Segurança: Só barra se NÃO for o dono E NÃO for admin ao mesmo tempo
    // Convertemos para string para garantir que a comparação funcione (evitando conflito de ObjectAs)
    const donoId = item.userId._id ? item.userId._id.toString() : item.userId.toString();
    if (donoId !== userId.toString() && usuarioLogado.role !== 'admin') {
        throw criarErro("Acesso negado. Você não tem permissão para remover este item.", 403);
    }

    //Regra de Negócio: Se o item já foi coletado, não é possível deletá-lo para fins de histórico
    if (item.status === 'coletado') {
        throw criarErro("Não é possível deletar um resíduo que já foi coletado pelo sistema.", 400);
    }

    return await itemRepository.remove(id);
};

export default { 
    criarItem, 
    listarTodosOsItens, 
    buscarItemPorId, 
    listarItensDoUsuario,
    atualizarItem, 
    marcarComoColetado, 
    deleteItem 
};