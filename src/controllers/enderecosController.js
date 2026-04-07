import enderecos from "../models/EnderecosModel.js";   
import RestaurantesEnderecos from "../models/RestaurantesEnderecosModel.js";

const get = async (req, res) => {
    try {
        const dados = await enderecos.findAll();
        return res.status(200).send({
            type: 'success',
            message: 'Endereços listados com sucesso!',
            data: dados,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os endereços.',
            data: error.message,
        });
    }
}

const getRestaurantes = async (req, res) => {
    try {
        const dados = await RestaurantesEnderecos.findAll();
        return res.status(200).send({
            type: 'success',
            message: 'Endereços de restaurantes listados com sucesso!',
            data: dados,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os endereços de restaurantes.',
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
        const endereco = await enderecos.findByPk(id);
        if (!endereco) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço não encontrado!',
                data: null,
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Endereço encontrado com sucesso!',
            data: endereco,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar o endereço.',
            data: error.message,
        });
    }
}

const getByRestaurante = async (req, res) => {
    try {
        const { id_restaurante } = req.params;
        const enderecos = await RestaurantesEnderecos.findAll({
            where: { id_restaurante }
        });
        if (!enderecos || enderecos.length === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Nenhum endereço encontrado para este restaurante!',
                data: null,
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Endereço(s) do restaurante encontrado(s) com sucesso!',
            data: enderecos,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao buscar o endereço do restaurante.',
            data: error.message,
        });
    }
}

const createRestauranteEndereco = async (req, res) => {
    try {
        const { logradouro, cep, numero, cidade, estado, id_restaurante } = req.body;
        if (!logradouro || !cep || !numero || !cidade || !estado || !id_restaurante) {
            return res.status(400).send({
                type: 'error',
                message: 'Todos os campos são obrigatórios!',
                data: null,
            });
        }
        const novoEndereco = await RestaurantesEnderecos.create(req.body);
        return res.status(201).send({
            type: 'success',
            message: 'Endereço do restaurante criado com sucesso!',
            data: novoEndereco,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao criar o endereço do restaurante.',
            data: error.message,
        });
    }
}

const createEnderecoPessoa = async (req, res) => {
    try {
        const { logradouro, numero, id_pessoa } = req.body;
        if (!logradouro || !numero || !id_pessoa) {
            return res.status(400).send({
                type: 'error',
                message: 'Os campos logradouro, número e id_pessoa são obrigatórios!',
                data: null,
            });
        }
        const novoEndereco = await enderecos.create(req.body);
        return res.status(201).send({
            type: 'success',
            message: 'Endereço da pessoa criado com sucesso!',
            data: novoEndereco,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao criar o endereço da pessoa.',
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
        const [updated] = await enderecos.update(req.body, {
            where: { id }
        });
        if (!updated) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço não encontrado para atualizar!',
                data: null,
            });
        }
        const enderecoAtualizado = await enderecos.findByPk(id);
        return res.status(200).send({
            type: 'success',
            message: 'Endereço atualizado com sucesso!',
            data: enderecoAtualizado,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao atualizar o endereço.',
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
        const deleted = await enderecos.destroy({
            where: { id }
        });
        if (!deleted) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço não encontrado!',
                data: null,
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Endereço deletado com sucesso!',
            data: null,
        });
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao excluir o endereço.',
            data: error.message,
        });
    }
}

export default {
    get,
    getRestaurantes,
    getById,
    getByRestaurante,
    createRestauranteEndereco,
    createEnderecoPessoa,
    update,
    destroy
};