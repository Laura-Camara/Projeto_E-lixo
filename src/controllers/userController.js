import userService from '../services/userService.js'

export const listarUsers = async (req, res, next) => {
    try {
        const users = await userService.listarUsers();
        res.status(200).json(users)

    } catch (error) {
        next(error);
    }
};

export const buscarUserPorId = async(req, res, next) => {
    try {
        const {id} = req.params;

        const usuarioLogado = req.user;

        // VALIDAÇÃO DE SEGURANÇA (LGPD & Propriedade do Recurso)
        // Se NÃO for admin E o userId do token for diferente do ID solicitado na URL... barra o acesso!
        if (usuarioLogado.role !== 'admin' && usuarioLogado.userId !== id) {
            return res.status(403).json({
                sucesso: false,
                erro: "Acesso negado. Você só tem permissão para visualizar o seu próprio perfil."
            });
        }

        const user = await userService.buscarUserPorId(id)
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }    
};

export const criarUser = async(req, res, next) => {
    try {
        const novoUser = await userService.criarUser(req.body)
        res.status(201).json(novoUser);

    } catch (error) {
        next(error);
    } 
};
export const atualizarPatchUser = async(req, res, next) => {
    try {
        const {id} = req.params;
        const dadosParaAtualizar = req.body;

        // req.user foi injetado pelo authMiddleware e contém os dados do token decodificado
        const usuarioLogado = req.user; 

        // Se NÃO for administrador E o ID do token for diferente do ID da URL... barra o acesso!
        if (usuarioLogado.role !== 'admin' && usuarioLogado.userId !== id) {
            return res.status(403).json({
                sucesso: false,
                erro: "Acesso negado. Você só tem permissão para atualizar o seu próprio perfil."
            });
        }

        const user = await userService.atualizarPatchUser(id, dadosParaAtualizar);
        res.json(user);

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        const idDaUrl = req.params.id;
        const idDoToken = req.user.userId

        if(idDaUrl !== idDoToken) {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Você não tem permissão para deletar o perfil de outro usuário."
            })
        }

        await userService.deleteUser(idDaUrl);
        res.status(200).json({
                sucesso: true,
                mensagem: "Seu perfil foi deletado com sucesso."
            });
        
    } catch (error) {
        next(error);
    }
};

export const renderListaUsers = async(req, res, next) => {
    try {
        const users = await userService.listarUsers();

        res.render('listaUsers', {
            title: "Usuários",
                users: users
        });
    } catch (error) {
        next(error)
    }
}

export default {listarUsers, buscarUserPorId, criarUser, atualizarPatchUser, deleteUser, renderListaUsers}