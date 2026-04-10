import Cardapios from '../models/CardapiosModel.js';
import Categorias from '../models/CategoriasModel.js';
import Restaurantes from '../models/RestaurantesModel.js';
import arquivosCardapio from '../models/ArquivosCardapioModel.js';
import fileUpload from '../utils/fileUpload.js';

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
                message: 'Item do cardápio não encontrado!',
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
        const { preco, id_categorias, id_restaurantes } = req.body;

        
        if (!preco || !id_categorias || !id_restaurantes) {
            return res.status(400).send({
                type: 'error',
                message: 'Os campos preco, id_categorias e id_restaurantes são obrigatórios!',
                data: null,
            });
        }

        const novoCardapio = await Cardapios.create({ 
            preco, 
            id_categorias, 
            id_restaurantes 
        });

        let arquivoSalvo = null;
        const tipoArquivo = req.query.tipo || 'imagem';

        if (req.files && req.files.uploadFile) {
            let upload = await fileUpload(req.files.uploadFile, {
                id: novoCardapio.id, 
                tipo: tipoArquivo,
                tabela: 'arquivosCardapio'
            });

            
            arquivoSalvo = await arquivosCardapio.create({
                id: novoCardapio.id, 
                tipo_arquivo: tipoArquivo,
                caminho_arquivo: upload.path,
                id_restaurante: id_restaurantes   
            });
        }

        
        return res.status(201).send({
            type: 'success',
            message: 'Item criado no cardápio com sucesso!',
            data: {
                cardapio: novoCardapio,
                arquivo: arquivoSalvo 
            },
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar o item no cardápio.',
            data: error.message,
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { preco, id_categorias, id_restaurantes } = req.body;

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
                message: 'Item do cardápio não encontrado!',
                data: null,
            });
        }

        
        cardapio.preco = preco || cardapio.preco;
        cardapio.id_categorias = id_categorias || cardapio.id_categorias;
        cardapio.id_restaurantes = id_restaurantes || cardapio.id_restaurantes;
        
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


export default {
    get,
    getById,
    getByCategoria,
    getByRestaurante,
    create,
    update,
    destroy
};