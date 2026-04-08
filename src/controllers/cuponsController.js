import Cupons from '../models/CuponsModel.js';

const get = async (req, res) => {
    try {
        const dados = await Cupons.findAll();
        return res.status(200).send({
            type: 'success',
            message: 'Cupons listados com sucesso!',
            data: dados,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os cupons.',
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
        const cupom = await Cupons.findByPk(id);
        if (!cupom) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado!',
                data: null,
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Cupom encontrado com sucesso!',
            data: cupom,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar o cupom.',
            data: error.message,
        });
    }
}   

const create = async (req, res) => {        
    try {
        const { codigo, desconto, validade } = req.body;
        if (!codigo || !desconto || !validade) {
            return res.status(400).send({
                type: 'error',
                message: 'Todos os campos são obrigatórios!',
                data: null,
            });
        }
        const novoCupom = await Cupons.create({ codigo, desconto, validade });
        return res.status(201).send({
            type: 'success',
            message: 'Cupom criado com sucesso!',
            data: novoCupom,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar o cupom.',
            data: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }
        const [updated] = await Cupons.update(req.body, {
            where: { id }
        });
        if (!updated) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado para atualizar!',
                data: null,
            });
        }
        const cupomAtualizado = await Cupons.findByPk(id);
        return res.status(200).send({
            type: 'success',
            message: 'Cupom atualizado com sucesso!',
            data: cupomAtualizado,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar o cupom.',
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
        const deleted = await Cupons.destroy({
            where: { id }
        });
        if (!deleted) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado para deletar!',
                data: null,
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Cupom deletado com sucesso!',
            data: null,
        });
    } catch (error) {
        res.status( 500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao deletar o cupom.',
            data: error.message,
        });
    }
}

export default {
    get,
    getById,
    create,
    update,
    destroy,
};