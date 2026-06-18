import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String,
        required: [true, 'A rua é obrigatória.']
    },
    numero: {
        type: String,
        required: [true, 'O número residencial é obrigatório.']
    },
    bairro: {
        type: String,
        required: [true, 'O bairro é obrigatório.']
    },
    cidade: {
        type: String,
        required: [true, 'A cidade é obrigatória.']
    },
    cep: {
        type: String,
        required: [true, 'O CEP é obrigatório.']
    },
    uf: {
        type: String,
        required: [true, 'O estado é obrigatório.'],
        trim: true
        }
}, { _id: false }); 

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true
    },
    login: {
        type: String,
        required: [true, 'O login é obrigatório.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória.'],
        minlength: [6, 'A senha deve conter no mínimo 6 caracteres.']
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'empresa'],
        default: 'user'
    },
    telefone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, insira um endereço de e-mail válido.'
        ]
    },
    endereco: {
        type: enderecoSchema,
        required: function() {
            return this.role !== 'admin';
        }
    },
    residuos: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;