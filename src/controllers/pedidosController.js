import pedidos from "../models/PedidosModel.js";
import pessoas from "../models/PessoasModel.js";
import cupons from "../models/CuponsModel.js";
import entregadores from "../models/EntregadoresModel.js";
import pagamentos from "../models/PagamentosModel.js";
import enderecos from "../models/EnderecosModel.js";
import status from "../models/StatusModel.js";
import TipoPagamento from "../models/TipoPagamentoModel.js";
import cardapios from "../models/CardapiosModel.js";
import Carrinhos from "../models/CarrinhosModel.js";
import setupAssociations from "../models/setupAssociations.js";

const get = async (req, res) => {
    try {
        const data = await pedidos.findAll({
            order: [['id', 'ASC']] 
        });
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

        const listaPedidos = await pedidos.findAll({
            where: { id_pessoas },
            include: [
                { 
                    model: status, 
                    as: 'status_pedido' 
                },
                { 
                    model: pagamentos, 
                    as: 'pagamento_pedido',
                    include: [{ 
                        model: TipoPagamento, 
                        as: 'tipoPagamento' // DEVE ser igual ao 'as' que você definiu no model Pagamentos
                    }]
                },
                { 
                    model: Carrinhos, 
                    as: 'itens_sacola',
                    include: [{ 
                        model: cardapios, 
                        as: 'produto' 
                    }] 
                }
            ],
            order: [['id', 'DESC']]
        });

        if (!listaPedidos || listaPedidos.length === 0) {
            return res.status(404).json({ error: 'Nenhum pedido encontrado!' });
        }

        return res.status(200).json(listaPedidos);

    } catch (error) {
        console.error("Erro no controller:", error);
        return res.status(500).json({ error: error.message });
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

const PostFinalizarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }

        const pedido = await pedidos.findByPk(id);
        
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }

        if (pedido.id_status !== 2 && pedido.id_status !== 4) {
            return res.status(400).json({ error: 'O pedido deve estar com status "Em preparo" ou "Saiu para entrega" para ser finalizado!' });
        }

        const pagamento = await pagamentos.findByPk(pedido.id_pagamento);
        
        if (!pagamento) {
            return res.status(404).json({ error: 'Pagamento não encontrado! Revise o pagamento do pedido' });
        }

        await pedidos.update(
            { id_status: 3 }, 
            { where: { id } }
        );

        const pedidoFinalizado = await pedidos.findByPk(id);

        return res.status(200).json({
            type: 'success',
            message: 'Pedido finalizado com sucesso!',
            data: {
                pedido: pedidoFinalizado,
                pagamento: pagamento
            }
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}


const fazerCheckout = async (req, res) => {
    try {
        const { id_pessoas, id_enderecos, id_pagamento, observacao, itens_sacola } = req.body;

        if (!id_pessoas || !id_enderecos || !id_pagamento || !itens_sacola || itens_sacola.length === 0) {
            return res.status(400).json({ 
                type: 'error', 
                message: 'Faltam dados para finalizar o pedido (pessoa, endereço, pagamento ou itens)!' 
            });
        }

        const novoPedido = await pedidos.create({
            id_pessoas: id_pessoas,
            id_enderecos: id_enderecos,
            id_pagamento: id_pagamento,
            observacao: observacao || 'Sem observações',
            data_pedido: new Date(), 
            id_status: 1,
            id_cupons: null, 
            id_entregadores: null
        });

        
        const itensParaSalvar = itens_sacola.map(item => {
            return {
                id_pedidos: novoPedido.id, 
                id_cardapios: item.id_cardapios,
                valor_individual: item.valor_individual
            };
        });

        await Carrinhos.bulkCreate(itensParaSalvar);

        return res.status(201).json({
            type: 'success',
            message: 'Pedido realizado com sucesso! A cozinha já está preparando.',
            data: {
                numero_pedido: novoPedido.id
            }
        });

    } catch (error) {
        console.error("Erro no Checkout:", error.message);
        return res.status(500).json({ 
            type: 'error',
            message: 'Ops! Ocorreu um erro interno ao processar seu pedido.',
            error: error.message 
        });
    }
}

export default { get, create, getById, getByPessoaId, update, destroy, getDisponiveisParaEntrega, PostFinalizarPedido, fazerCheckout};