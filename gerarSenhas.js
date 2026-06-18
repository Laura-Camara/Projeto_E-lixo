import bcrypt from 'bcrypt'

async function hashPassword() {
    const senha = 'coleta123';
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);
    console.log(`Senha ori ${senha}`);
    console.log(`Hash gerado ${hashedSenha}`);
}

hashPassword()