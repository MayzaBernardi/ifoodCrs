import entregadores from '../models/EntregadoresModel.js';
import Pessoas from '../models/PessoasModel.js';

const get = async (req, res) => {
    try {
        const dados = await entregadores.findAll();
        return res.status(200).send({
            type: 'success',
            message: 'Entregadores listados com sucesso!',
            data: dados,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os entregadores.',
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
        const entregador = await entregadores.findByPk(id);

        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Entregador encontrado com sucesso!',
            data: entregador.dataValues,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar o entregador.',
            data: error.message,   
        });
    }
}

const create = async (req, res) => {        
    try {
        const { id_pessoa } = req.body;
        if (!id_pessoa) {
            return res.status(400).send({
                type: 'error',
                message: 'O campo id_pessoa é obrigatório!',
                data: null,
            });
        }
        const pessoa = await Pessoas.findByPk(id_pessoa);
        if (!pessoa) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }
        const novoEntregador = await entregadores.create({ id_pessoa });
        return res.status(201).send({
            type: 'success',
            message: 'Entregador criado com sucesso!',
            data: novoEntregador,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar o entregador.',
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
        const entregador = await entregadores.findByPk(id);
        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }
        await entregador.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Entregador deletado com sucesso!',
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao deletar o entregador.',
            data: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pessoa } = req.body;
        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }
        const entregador = await entregadores.findByPk(id);
        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }
        if (id_pessoa) {
            const pessoa = await Pessoas.findByPk(id_pessoa);
            if (!pessoa) {
                return res.status(404).send({
                    type: 'error',
                    message: 'Pessoa não encontrada!',
                    data: null,
                });
            }
            entregador.id_pessoa = id_pessoa;
        }
        await entregador.save();
        return res.status(200).send({
            type: 'success',
            message: 'Entregador atualizado com sucesso!',
            data: entregador,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar o entregador.',
            data: error.message,
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

