import Categorias from "../models/CategoriasModel.js";

const get = async (req, res) => {
    try {
        const dados = await Categorias.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Categorias listadas com sucesso!',
            data: dados,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar as categorias.',
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

        const categoria = await Categorias.findByPk(id);

        if (!categoria) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Categoria encontrada com sucesso!',
            data: categoria,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar a categoria.',
            data: error.message,
        });
    }
}

const create = async (req, res) => {
    try {
        const { nome_categoria } = req.body;

        if (!nome_categoria) {
            return res.status(400).send({
                type: 'error',
                message: 'O nome da categoria é obrigatório!',
                data: null,
            });
        }

        const novaCategoria = await Categorias.create({ nome_categoria });

        return res.status(201).send({
            type: 'success',
            message: 'Categoria criada com sucesso!',
            data: novaCategoria,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar a categoria.',
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

        const categoria = await Categorias.findByPk(id);

        if (!categoria) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada!',
                data: null,
            });
        }

        await categoria.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Categoria deletada com sucesso!',
            data: null,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao deletar a categoria.',
            data: error.message,
        });
    }
};


export default {
    get,    
    getById,
    create,
    destroy
};    

