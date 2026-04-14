import Pessoas from '../models/PessoasModel.js';
import PerfilUsuario from '../models/PerfilUsuarioModel.js';
import Restaurantes from '../models/RestaurantesModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const get = async (req, res) => {
    try{

        const dados  = await Pessoas.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Pessoas listadas com sucesso!',
            data: dados,
        });

    }catch(error){
        console.error(error.message);

        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar as pessoas.',
            data: error.message,
        });
    }
}

const getById = async (req, res) => {
    try {

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const pessoa = await Pessoas.findByPk(id);

        if (!pessoa) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa encontrada com sucesso!',
            data: pessoa,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar a pessoa.',
            data: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(isNaN(id)){
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const pessoa = await Pessoas.findByPk(id);

        if(!pessoa){
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }

        
        if (req.body.senha) {
            const saltRounds = 10;
            req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
        }

        Object.keys(req.body).forEach(key => {
            if (['nome', 'email', 'senha', 'cpf', 'data_nascimento'].includes(key)) {
                pessoa[key] = req.body[key];
            }
        });

        await pessoa.save();

        const pessoaData = pessoa.toJSON();
        delete pessoaData.senha; 

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa atualizada com sucesso!',
            data: pessoaData,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar a pessoa, revise o id e tente novamente.',
            data: error.message,
        });
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const pessoa = await Pessoas.findByPk(id);

        if (!pessoa) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }

        await pessoa.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa deletada com sucesso!',
            data: null,
        });

    } catch (error) {
        console.error("Erro no destroy:", error.message);

        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao excluir a pessoa.',
            data: process.env.NODE_ENV === 'development' ? error.message : null,
        });
    }
}

const register = async (req, res) => {
    try {
        const { nome, email, senha, cpf, data_nascimento } = req.body;

        if(!nome || !email || !senha){
            return res.status(400).send({
                type: 'error',
                message: 'Nome, email e senha são obrigatórios!',
                data: null,
            });
        }

        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const pessoa = await Pessoas.create({
            nome,
            email,
            senha: senhaHash, 
            cpf,
            data_nascimento
        });

        const token = jwt.sign(
            { 
                idUsuario: pessoa.id,
                nomeUsuario: pessoa.nome,
                emailUsuario: pessoa.email
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: '8h' } 
        );
        
        return res.status(201).send({
            type: 'success',
            message: 'Pessoa criada com sucesso!',
            data: { ...pessoa.toJSON(), token },
        });
    } catch(error){
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar a pessoa.',
            data: error.message,
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if(!email || !senha){
            return res.status(400).send({
                type: 'error',
                message: 'Email e senha são obrigatórios!',
                data: null,
            });
        }

        const pessoa = await Pessoas.findOne({ where: { email } });

        if (!pessoa) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }

        const isPasswordValid = await bcrypt.compare(senha, pessoa.senha);

        if (!isPasswordValid) {
            return res.status(401).send({
                type: 'error',
                message: 'Senha incorreta!',
                data: null,
            });
        }

        const token = jwt.sign(
                { 
                    idUsuario: pessoa.id, 
                    nomeUsuario: pessoa.nome,
                    emailUsuario: pessoa.email
                }, 
                process.env.SECRET_KEY, 
                { expiresIn: '8h' } 
            );

        return res.status(200).send({
            type: 'success',
            message: 'Login realizado com sucesso!',
            data: { ...pessoa.toJSON(), token },
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao realizar o login.',
            data: error.message,
        });
    }
}   


const delegarPerfil = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const { papel } = req.body; 

        const papeisPermitidos = ['admin', 'entregador', 'cliente', 'restaurante'];
        if (!papeisPermitidos.includes(papel)) {
            return res.status(400).send({ 
                type: 'error', 
                message: 'Perfil inválido! Escolha um perfil válido.' 
            });
        }

        const pessoa = await Pessoas.findByPk(id);
        if (!pessoa) {
            return res.status(404).send({ 
                type: 'error', 
                message: 'Pessoa não encontrada no sistema!' 
            });
        }

        const perfilExistente = await PerfilUsuario.findOne({
            where: { id_pessoa: id, papel: papel }
        });

        if (perfilExistente) {
            return res.status(400).send({ 
                type: 'error', 
                message: `Esta pessoa já possui o perfil de ${papel}!` 
            });
        }

        const novoPerfil = await PerfilUsuario.create({
            papel: papel,
            id_pessoa: id
        });

        return res.status(201).send({
            type: 'success',
            message: `O perfil de '${papel}' foi delegado com sucesso para ${pessoa.nome}!`,
            data: novoPerfil
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
            type: 'error', 
            message: 'Erro interno ao delegar o perfil.', 
            data: error.message 
        });
    }
};




export default {
    get,
    getById,
    update,
    destroy,
    register,
    login,
    delegarPerfil
};

