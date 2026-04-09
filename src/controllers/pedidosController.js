import pedidos from "../models/PedidosModel.js";
import pessoas from "../models/PessoasModel.js";
import cupons from "../models/CuponsModel.js";
import entregadores from "../models/EntregadoresModel.js";
import pagamentos from "../models/PagamentosModel.js";
import enderecos from "../models/EnderecosModel.js";
import status from "../models/StatusModel.js";
import TipoPagamento from "../models/TipoPagamentoModel.js";

const get = async (req, res) => {
    try {
        const data = await pedidos.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const create = async (req, res) => {
    try {
        const { observacao, id_pessoas, id_cupons, id_entregadores, id_pagamento, id_enderecos, data_pedido, id_status } = req.body;
        const novoPedido = await pedidos.create({
            observacao,
            id_pessoas,
            id_cupons,
            id_entregadores,
            id_pagamento,
            id_enderecos,
            data_pedido,
            id_status
        });
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }
        const pedido = await pedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getByPessoaId = async (req, res) => {
    try {
        const { id_pessoas } = req.params;
        if (isNaN(id_pessoas)) {
            return res.status(400).json({ error: 'O id_pessoas deve ser um número!' });
        }
        const listaPedidos = await pedidos.findAll({ where: { id_pessoas } });
        if (!listaPedidos || listaPedidos.length === 0) {
            return res.status(404).json({ error: 'Nenhum pedido encontrado para essa pessoa!' });
        }
        res.status(200).json(listaPedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDisponiveisParaEntrega = async (req, res) => {
    try {
        const pedidosDisponiveis = await pedidos.findAll({ 
            where: { 
                id_status: 2, 
                id_entregadores: null 
            } 
        });

        if (!pedidosDisponiveis || pedidosDisponiveis.length === 0) {
            return res.status(404).json({ 
                type: 'error',
                message: 'Nenhum pedido disponível para entrega no momento.',
                data: []
            });
        }

        return res.status(200).json({
            type: 'success',
            message: 'Pedidos disponíveis encontrados com sucesso!',
            data: pedidosDisponiveis
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ 
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os pedidos para entrega.',
            data: error.message 
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pessoas, id_cupons, id_entregadores, id_pagamento, id_enderecos, id_status } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }
        const pedidoExistente = await pedidos.findByPk(id);
        if (!pedidoExistente) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }
        await pedidos.update(
            { id_pessoas, id_cupons, id_entregadores, id_pagamento, id_enderecos, id_status },
            { where: { id } }
        );
        const updatedPedido = await pedidos.findByPk(id);
        res.status(200).json(updatedPedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }
        const deletado = await pedidos.destroy({ where: { id } });
        if (!deletado) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }
        res.status(200).json({ message: 'Pedido deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { get, create, getById, getByPessoaId, update, destroy, getDisponiveisParaEntrega};