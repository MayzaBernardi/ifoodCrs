// import sequelize from '../config/index.js';
import { QueryTypes } from 'sequelize';
import Restaurantes from '../models/RestaurantesModel.js';
import Pessoas from '../models/PessoasModel.js';
import Favoritos from '../models/FavoritosModel.js';

const get = async (req, res) => {
    try{

        const dados  = await Restaurantes.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes listados com sucesso!',
            data: dados,
        });

    }catch(error){
        console.error(error.message);

        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os restaurantes.',
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

        const restaurante = await Restaurantes.findByPk(id);

        if (!restaurante) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Restaurante encontrado com sucesso!',
            data: restaurante,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar o restaurante.',
            data: error.message,
        });

    }
}

const getByCategoria = async (req, res) => {
    try {

        const { categoria } = req.params;

        const restaurantes = await Restaurantes.findAll({
            where: {
                categoria: categoria
            }
        });

        if (restaurantes.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum restaurante encontrado para a categoria informada!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes encontrados com sucesso!',
            data: restaurantes,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar os restaurantes por categoria.',
            data: error.message,
        });

    }
}   

const getByHorarioAndFavoritadoRaw = async (req, res) => {
    try {
        const { horario_atendimento } = req.query;

        if (!horario_atendimento) {
            return res.status(400).send({
                type: 'error',
                message: 'O horário de atendimento é obrigatório!',
                data: null,
            });
        }
    
        const querySQL = `
            SELECT 
                r.*, 
                f.id AS favorito_id, 
                p.nome AS pessoa_nome
            FROM restaurantes r
            LEFT JOIN favoritos f ON r.id = f.id_restaurantes
            LEFT JOIN pessoas p ON f.id_pessoas = p.id
            WHERE r.horario_atendimento = :horario
            ORDER BY f.id DESC;
        `;

        
        const restaurantes = await sequelize.query(querySQL, {
            replacements: { horario: horario_atendimento }, 
            type: QueryTypes.SELECT 
        });

        if (!restaurantes || restaurantes.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum restaurante encontrado para o horário informado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes listados com sucesso!',
            data: restaurantes,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno na consulta.',
            data: error.message,
        });
    }
};

const create = async (req, res) => {
    try {
        const { nome, categoria } = req.body;

        if (!nome || !categoria) {
            return res.status(400).send({
                type: 'error',
                message: 'Os campos nome e categoria são obrigatórios!',
                data: null,
            });
        }

        const novoRestaurante = await Restaurantes.create({ nome, categoria });

        return res.status(201).send({
            type: 'success',
            message: 'Restaurante criado com sucesso!',
            data: novoRestaurante,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao criar o restaurante.',
            data: error.message,
        });
    }
};  

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, categoria } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const restaurante = await Restaurantes.findByPk(id);

        if (!restaurante) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado!',
                data: null,
            });
        }

        restaurante.nome = nome || restaurante.nome;
        restaurante.categoria = categoria || restaurante.categoria;

        await restaurante.save();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurante atualizado com sucesso!',
            data: restaurante,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao atualizar o restaurante.',
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

        const restaurante = await Restaurantes.findByPk(id);

        if (!restaurante) {
            return res.status(404).send({
                type: 'error',
                message: 'Restaurante não encontrado!',
                data: null,
            });
        }

        await restaurante.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurante deletado com sucesso!',
            data: null,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao deletar o restaurante.',
            data: error.message,
        });
    }
};


export default {
    get,
    getById,
    getByCategoria,
    getByHorarioAndFavoritadoRaw,
    create,
    update,
    destroy
};  
