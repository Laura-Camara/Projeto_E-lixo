export const empresaResponseDTO = (empresa) => {
    return {
        id: empresa._id,
        nome: empresa.nome,
        email: empresa.email,
        telefone: empresa.telefone
    };
};