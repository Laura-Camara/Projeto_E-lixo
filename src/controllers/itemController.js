import itemService from "../services/itemService.js";

export const criarItem = async(req, res, next) => {
    try {
        const dadosBrutos = req.body;
        const userId = req.user.userId;
    
        const novoItem = await itemService.criarItem(dadosBrutos, userId);
    
        return res.status(201).json({
            sucesso: true,
            mensagem: "Resíduo cadastrado com sucesso para coleta!",
            dados: novoItem
        });
        
    } catch (error) {
        next(error);
    }
};

export const listarTodosOsItens = async(req, res, next) => {
    try {
        const itens = await itemService.listarTodosOsItens();

        return res.status(200).json({sucesso: true, dados: itens})
    } catch (error) {
        next(error);
    }
};

export const buscarItemPorId = async(req, res, next) => {
    try {
        const {id} = req.params;
        const usuarioLogado = req.user; // Contém { userId, role }

        const item = await itemService.buscarItemPorId(id, usuarioLogado);

        return res.status(200).json({sucesso: true, dados: item});
    } catch (error) {
        next(error);
    }
};

export const listarItensDoUsuarioLogado = async(req, res, next) => {
    try {
        const userId = req.user.userId;

        const meusItens = await itemService.listarItensDoUsuario(userId);

        return res.status(200).json(meusItens);
    } catch (error) {
        next(error);
    }
};

export const atualizarItem = async(req, res, next) => {
    try {
        const {id} = req.params; // ID do item vindo da URL
        const userId = req.user.userId; // ID do usuário do token

        const itemAtualizado = await itemService.atualizarItem(id, req.body, userId);

        return res.status(200).json({
            sucesso: true,
            mensagem: "Informações do resíduo atualizadas com sucesso!",
            dados: itemAtualizado
        })
    } catch (error) {
        next(error)
    }
}

export const marcarComoColetado = async(req, res, next) => {
    try {
        const {id} = req.params;

        const itemAtualizado = await itemService.marcarComoColetado(id);

        return res.status(200).json({
            sucesso: true,
            mensagem: "Status do resíduo atualizado para coletado com sucesso!",
            dados: itemAtualizado
        });
    } catch (error) {
        next(error);
    }
};

export const deleteItem = async(req, res, next) => {
    try {
        const {id} = req.params; // ID do item vindo da URL
        const userLogado = req.user
        
        // O ID do item E o ID do usuário é passado para o service validar
        await itemService.deleteItem(id, userLogado);

        return res.status(200).json({
            sucesso: true,
            mensagem: "Item removido do sistema com sucesso."
        });
    } catch (error) {
        next(error)
    }
};

export default {
    criarItem,
    listarTodosOsItens,
    buscarItemPorId,
    listarItensDoUsuarioLogado,
    atualizarItem,
    marcarComoColetado,
    deleteItem
}