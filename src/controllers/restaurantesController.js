import { QueryTypes } from 'sequelize';
import Restaurantes from '../models/RestaurantesModel.js';

const get = async (req, res) => {
    try {
        const dados  = await Restaurantes.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes listados com sucesso!',
            data: dados,
        });

    } catch(error) {
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


const getByHorarioAndFavoritadoRaw = async (req, res) => {
    try {
        const { horario, id_pessoa } = req.query;

        if (!horario) {
            return res.status(400).send({
                type: 'error',
                message: 'O parâmetro de horário é obrigatório!',
                data: null,
            });
        }
    
        const querySQL = `
            SELECT 
                r.*, 
                CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END AS is_favorito
            FROM restaurantes r
            LEFT JOIN favoritos f 
                ON r.id = f.id_restaurantes 
                ${id_pessoa ? 'AND f.id_pessoas = :id_pessoa' : ''}
            WHERE r.horario_atendimento = :horario
            ORDER BY is_favorito DESC, r.nome_restaurante ASC;
        `;
        
        const restaurantes = await sequelize.query(querySQL, {
            replacements: { 
                horario: horario,
                ...(id_pessoa && { id_pessoa }) 
            }, 
            type: QueryTypes.SELECT 
        });

        if (!restaurantes || restaurantes.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum restaurante aberto encontrado para este horário.',
                data: [],
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
        const { nome_restaurante, cnpj, horario_atendimento, tempo_entrega, id_cupons } = req.body;

        if (!nome_restaurante || !cnpj || !horario_atendimento || !tempo_entrega || !id_cupons) {
            return res.status(400).send({
                type: 'error',
                message: 'Todos os campos são obrigatórios (nome_restaurante, cnpj, horario_atendimento, tempo_entrega, id_cupons)!',
                data: null,
            });
        }

        const novoRestaurante = await Restaurantes.create({ 
            nome_restaurante, 
            cnpj, 
            horario_atendimento, 
            tempo_entrega, 
            id_cupons 
        });

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
        const { nome_restaurante, cnpj, horario_atendimento, tempo_entrega, id_cupons } = req.body;

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

        // Atualiza apenas o que foi enviado no body
        restaurante.nome_restaurante = nome_restaurante || restaurante.nome_restaurante;
        restaurante.cnpj = cnpj || restaurante.cnpj;
        restaurante.horario_atendimento = horario_atendimento || restaurante.horario_atendimento;
        restaurante.tempo_entrega = tempo_entrega || restaurante.tempo_entrega;
        restaurante.id_cupons = id_cupons || restaurante.id_cupons;

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
    getByHorarioAndFavoritadoRaw,
    create,
    update,
    destroy
};