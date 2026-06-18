// Garante que só dados permitidos entrem no sistema
export const criarItemDTO = (dadosDoBody) => {
    return {
        tipo: dadosDoBody.tipo?.trim(),
        marca: dadosDoBody.marca?.trim(),
        condicao: dadosDoBody.condicao,
        quantidade: Number(dadosDoBody.quantidade) || 1,
        descricao: dadosDoBody.descricao?.trim() || "",
        localizacao: {
            lat: Number(dadosDoBody.localizacao?.lat),
            lng: Number(dadosDoBody.localizacao?.lng)
        }
    };
};

export const respostaItemDTO = (itemBanco) => {
    return {
        _id: itemBanco._id,
        tipo: itemBanco.tipo,
        marca: itemBanco.marca,
        condicao: itemBanco.condicao,
        quantidade: itemBanco.quantidade,
        linha: itemBanco.linha,
        status: itemBanco.status,
        dataCriacao: itemBanco.createdAt,
        localizacao: itemBanco.localizacao,
        //Se o userId foi povoado, retorna os dados limpos do dono. 
        // Se não foi (ou se o campo for nulo), retorna null de forma segura.
        dono: itemBanco.userId?._id ? {
            _id: itemBanco.userId._id,
            nome: itemBanco.userId.nome,
            email: itemBanco.userId.email
        } : null
    };
};