import bcrypt from 'bcrypt';

async function hashSenha() {
    const senha = 'joao123';
    const saltRounds = 10;
    const senhaHashed = await bcrypt.hash(senha, saltRounds);
    console.log(`Senha original: ${senha}`);
    console.log(`Hash gerado: ${senhaHashed}`);
}

hashSenha()

//Muda no login e cadastrar usuario