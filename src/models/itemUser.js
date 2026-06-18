import mongoose from "mongoose";

const itemUserSchema = new mongoose.Schema ({
    tipo: {
        type: String,
        required: [true, 'O tipo do resíduo/item é obrigatório.'],
        trim: true
    },
    marca: {
        type: String,
        required: [true, 'A marca ou fabricante é obrigatória.'],
        trim: true
    },
    condicao: {
        type: String,
        required: [true, 'A condição do item deve ser informada.'],
        enum: ['funcional', 'defeituoso', 'sucata' ]
    },
    descricao: {
        type: String,
        required: [true, 'Uma breve descrição sobre o estado do item é obrigatória.'],
        trim: true,
        maxlength: [500, 'A descrição não pode passar de 500 caracteres.']
    },
    quantidade: {
        type: Number,
        required: true,
        min: [1, 'A quantidade mínima de item é 1.'],
        default: 1
    },
    linha: {
        type: String,
        required: true,
        enum: ['verde', 'azul', 'marrom', 'branca']
    },
    status: {
        type: String,
        default: 'pendente',
        enum: ['pendente', 'coletado']
    },
    localizacao: {
        lat: { 
            type: Number, 
            required: function() { return this.role !== 'admin'; } 
        },
        lng: { 
            type: Number, 
            required: function() { return this.role !== 'admin'; } 
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'O item deve estar vinculado a um usuário.']
    }
}, { 
    timestamps: true
})

const ItemUser = mongoose.model('ItemUser', itemUserSchema);

export default ItemUser;