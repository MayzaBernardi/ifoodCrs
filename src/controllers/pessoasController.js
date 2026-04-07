import Pessoas from '../models/PessoasModel.js';

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

const create = async (req, res) => {
    try{
        const {
            nome,
            email,
            senha,
            cpf,
            dataNascimento
        } = req.body;

        if(!nome){
            return res.status(400).send({
                type: 'error',
                message: 'O nome é obrigatório!',
                data: null,
            });
        }

        const retorno = await Pessoas.create({
            nome,
            email,
            senha,
            cpf,
            dataNascimento
        });

        return res.status(201).send({
            type: 'success',
            message: 'Pessoa criada com sucesso!',
            data: retorno,
        });

    } catch(error){
    console.error(error.message);

        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar as pessoas.',
            data: error.message,

        });
    }
}

const update = async (req, res) => {
    try {

        const { id } = req.params;
        const {
            nome,
            email,
            senha,
            cpf,
            dataNascimento
        } = req.body;

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

        Object.keys(req.body).forEach(key => {
            if (['nome', 'email', 'senha', 'cpf', 'dataNascimento'].includes(key)) {
                pessoa[key] = req.body[key];
            }
        });

        await pessoa.save();

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa atualizada com sucesso!',
            data: pessoa,
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar as pessoas, revise o id e tente novamente.',
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


export default {
    get,
    getById,
    create,
    update,
    destroy
};
