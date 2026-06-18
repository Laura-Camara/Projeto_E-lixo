export const userResponseDTO = (user) => {
    return {
        id: user._id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
    };
};