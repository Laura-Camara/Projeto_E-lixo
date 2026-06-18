export const globalErrorHandle = (error, req, res, next) => {
    console.error("Erro detectado: ", error.message);
    console.error("Stack: ", error.stack);
    
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: error.statusCode ? error.message : 'Ocorreu um erro interno no servidor.',
    })
}

export const criarErro = (mensagem, status) => {
    const error = new Error(mensagem);
    error.statusCode = status;
    return error;
}

export const rotaNaoEncontrada = (req, res) => {
    res.status(404).json({mensagem: "A rota solicitada não existe."})
}
