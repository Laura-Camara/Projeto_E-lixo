import empresaService from "../services/empresaService.js";

export const listarEmpresas = async (req, res, next) => {
    try {
        const empresas = await empresaService.listarEmpresas();
        res.status(200).json(empresas)

    } catch (error) {
        next(error);
    }
};

export const buscarEmpresaPorId = async(req, res, next) => {
    try {
        const {id} = req.params
        const empresa = await empresaService.buscarEmpresaPorId(id)
        res.status(200).json(empresa);

    } catch (error) {
        next(error);
    }    
};

export const criarEmpresa = async(req, res, next) => {
    try {
        const novaEmpresa = await empresaService.criarEmpresa(req.body)
        res.status(201).json(novaEmpresa);

    } catch (error) {
        next(error);
    } 
};
export const atualizarPatchEmpresa = async(req, res, next) => {
    try {
        const {id} = req.params;
        const dadosParaAtualizar = req.body;
        const empresa = await empresaService.atualizarPatchEmpresa(id, dadosParaAtualizar);
        res.json(empresa);

    } catch (error) {
        next(error);
    }
}

export const deleteEmpresa = async(req, res, next) => {
    try {
        const idDaUrl = req.params.id;
        const idDoToken = req.empresa.empresaId
        
        if(idDaUrl !== idDoToken) {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Você não tem permissão para deletar o perfil de outro usuário."
            })
        }

        await empresaService.deleteEmpresa(idDaUrl);
        res.status(200).json({
            sucesso: true,
            mensagem: "Seu perfil foi deletado com sucesso."
        });
        
    } catch (error) {
        next(error);
    }
};

export const renderListaEmpresas = async(req, res, next) => {
    try {
        const empresas = await empresaService.listarEmpresas();

        res.render('listaEmpresas', {
            title: "Empresas de Reciclagem",
                empresas: empresas
        });
    } catch (error) {
        next(error)
    }
}

export default {listarEmpresas, buscarEmpresaPorId, criarEmpresa, atualizarPatchEmpresa, deleteEmpresa, renderListaEmpresas};