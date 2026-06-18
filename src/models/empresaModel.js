import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    razaoSocial: {
        type: String,
        required: [true, 'A razão social é obrigatória.'],
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
        default: 'empresa'
    },
    telefone: {
        type: String,
        required: [true, 'O telefone é obrigatório.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório.'],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, insira um endereço de e-mail válido.'
        ]
    },
    cnpj: {
        type: String,
        required: [true, 'O CNPJ é obrigatório.'],
        unique: true, 
        trim: true
    },
    endereco: {
        rua: {
            type: String,
            required: [true, 'A rua é obrigatória.'],
            trim: true
        },
        numero: {
            type: String,
            required: [true, 'O número é obrigatório.'],
            trim: true
        },
        bairro: {
            type: String,
            required: [true, 'O bairro é obrigatório.'],
            trim: true
        },
        cidade: {
            type: String,
            required: [true, 'A cidade é obrigatória.'],
            trim: true
        },
        cep: {
            type: String,
            required: [true, 'O CEP é obrigatório.'],
            trim: true,
            minlength: [8, 'O CEP deve conter pelo menos 8 caracteres.']
        }
    },
    localizacao: {
        lat: { 
            type: Number, 
            required: [true, 'A latitude da empresa é obrigatória para o mapa.'] 
        },
        lng: { 
            type: Number, 
            required: [true, 'A longitude da empresa é obrigatória para o mapa.'] 
        }
    }
}, { 
    timestamps: true
});

const Empresa = mongoose.model('Empresa', empresaSchema);

export default Empresa;