import Carrinhos from '../models/CarrinhosModel.js';
import Cardapios from '../models/CardapiosModel.js';
import Pessoas from '../models/PessoasModel.js';

const get = async (req, res) => {
    try {
        const dados = await Carrinhos.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Carrinhos listados com sucesso!',
            data: dados,
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os carrinhos.',
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

        const carrinho = await Carrinhos.findByPk(id);

        if (!carrinho) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Carrinho encontrado com sucesso!',
            data: carrinho,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar o carrinho.',
            data: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        const { id_pessoas, id_cardapios, quantidade } = req.body;

        if (!id_pessoas || !id_cardapios || !quantidade) {
            return res.status(400).send({
                type: 'error',
                message: 'Todos os campos são obrigatórios!',
                data: null,
            });
        }

        const carrinho = await Carrinhos.create({
            id_pessoas,
            id_cardapios,
            quantidade
        });

        return res.status(201).send({
            type: 'success',
            message: 'Carrinho criado com sucesso!',
            data: carrinho,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao criar o carrinho.',
            data: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pessoas, id_cardapios, quantidade } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const carrinho = await Carrinhos.findByPk(id);

        if (!carrinho) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado!',
                data: null,
            });
        }

        await carrinho.update({
            id_pessoas,
            id_cardapios,
            quantidade
        });

        return res.status(200).send({
            type: 'success',
            message: 'Carrinho atualizado com sucesso!',
            data: carrinho,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao atualizar o carrinho.',
            data: error.message,
        });
    }
};

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

        const carrinho = await Carrinhos.findByPk(id);

        if (!carrinho) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado!',
                data: null,
            });
        }

        await carrinho.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Carrinho deletado com sucesso!',
            data: null,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao deletar o carrinho.',
            data: error.message,
        });
    }
};

const getByPedidoId = async (req, res) => {
    try {
        const { id_pedidos } = req.params;

        if (isNaN(id_pedidos)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id_pedidos deve ser um número!',
                data: null,
            });
        }

        const carrinhos = await Carrinhos.findAll({
            where: { id_pedidos }
        });

        return res.status(200).send({
            type: 'success',
            message: 'Carrinhos encontrados com sucesso!',
            data: carrinhos,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar os carrinhos.',
            data: error.message,
        });
    }
};


export default {
    get,
    getById,
    create,
    update,
    destroy,
    getByPedidoId
};

