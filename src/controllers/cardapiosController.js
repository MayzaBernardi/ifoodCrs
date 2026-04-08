import Cardapios from '../models/CardapiosModel.js';
import Categorias from '../models/CategoriasModel.js';
import Restaurantes from '../models/RestaurantesModel.js';

const get = async (req, res) => {
    try {
        const dados = await Cardapios.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Cardápios listados com sucesso!',
            data: dados,
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os cardápios.',
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

        const cardapio = await Cardapios.findByPk(id);

        if (!cardapio) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Cardápio encontrado com sucesso!',
            data: cardapio,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar o cardápio.',
            data: error.message,
        });
    }
}

const getByCategoria = async (req, res) => {
    try {
        const { id_categorias } = req.params;

        if (isNaN(id_categorias)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id da categoria deve ser um número!',
                data: null,
            });
        }

        const cardapios = await Cardapios.findAll({ where: { id_categorias } });

        if (!cardapios || cardapios.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum cardápio encontrado para essa categoria!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Cardápios encontrados com sucesso!',
            data: cardapios,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar os cardápios.',
            data: error.message,
        });
    }
};

const getByRestaurante = async (req, res) => {
    try {
        const { id_restaurantes } = req.params;

        if (isNaN(id_restaurantes)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id do restaurante deve ser um número!',
                data: null,
            });
        }

        const cardapios = await Cardapios.findAll({ where: { id_restaurantes } });

        if (!cardapios || cardapios.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum cardápio encontrado para esse restaurante!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Esse é o cardápio do restaurante solicitado!',
            data: cardapios,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar os cardápios.',
            data: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        const { nome, descricao, id_categorias } = req.body;

        if (!nome || !descricao) {
            return res.status(400).send({
                type: 'error',
                message: 'Os campos nome e descrição são obrigatórios!',
                data: null,
            });
        }

        const novoCardapio = await Cardapios.create({ nome, descricao, id_categorias });

        return res.status(201).send({
            type: 'success',
            message: 'Cardápio criado com sucesso!',
            data: novoCardapio,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar o cardápio.',
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

        const cardapio = await Cardapios.findByPk(id);

        if (!cardapio) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado!',
                data: null,
            });
        }

        await cardapio.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Cardápio deletado com sucesso!',
            data: null,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao deletar o cardápio.',
            data: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, id_categorias } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const cardapio = await Cardapios.findByPk(id);

        if (!cardapio) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado!',
                data: null,
            });
        }

        if (!nome || !descricao) {
            return res.status(400).send({
                type: 'error',
                message: 'Os campos nome e descrição são obrigatórios!',
                data: null,
            });
        }

        cardapio.nome = nome;
        cardapio.descricao = descricao;
        cardapio.id_categorias = id_categorias || cardapio.id_categorias;
        await cardapio.save();

        return res.status(200).send({
            type: 'success',
            message: 'Cardápio atualizado com sucesso!',
            data: cardapio,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar o cardápio.',
            data: error.message,
        });
    }
};

export default {
    get,
    getById,
    getByCategoria,
    getByRestaurante,
    create,
    update,
    destroy
};