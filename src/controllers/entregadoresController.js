import entregadores from '../models/EntregadoresModel.js';
import Pessoas from '../models/PessoasModel.js';
import pedidos from '../models/PedidosModel.js';

const get = async (req, res) => {
    try {
        const dados = await entregadores.findAll();
        return res.status(200).send({
            type: 'success',
            message: 'Entregadores listados com sucesso!',
            data: dados,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar os entregadores.',
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
        const entregador = await entregadores.findByPk(id);

        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Entregador encontrado com sucesso!',
            data: entregador.dataValues,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao buscar o entregador.',
            data: error.message,   
        });
    }
}

const create = async (req, res) => {        
    try {
        const { id_pessoa } = req.body;
        if (!id_pessoa) {
            return res.status(400).send({
                type: 'error',
                message: 'O campo id_pessoa é obrigatório!',
                data: null,
            });
        }
        const pessoa = await Pessoas.findByPk(id_pessoa);
        if (!pessoa) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }
        const novoEntregador = await entregadores.create({ id_pessoa });
        return res.status(201).send({
            type: 'success',
            message: 'Entregador criado com sucesso!',
            data: novoEntregador,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar o entregador.',
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
        const entregador = await entregadores.findByPk(id);
        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }
        await entregador.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Entregador deletado com sucesso!',
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao deletar o entregador.',
            data: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_pessoa } = req.body;
        if (isNaN(id)) {
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }
        const entregador = await entregadores.findByPk(id);
        if (!entregador) {
            return res.status(404).send({
                type: 'error',
                message: 'Entregador não encontrado!',
                data: null,
            });
        }
        if (id_pessoa) {
            const pessoa = await Pessoas.findByPk(id_pessoa);
            if (!pessoa) {
                return res.status(404).send({
                    type: 'error',
                    message: 'Pessoa não encontrada!',
                    data: null,
                });
            }
            entregador.id_pessoa = id_pessoa;
        }
        await entregador.save();
        return res.status(200).send({
            type: 'success',
            message: 'Entregador atualizado com sucesso!',
            data: entregador,
        });
    } catch (error) {
        res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar o entregador.',
            data: error.message,
        });
    }
}

const postPegarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_entregadores } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }

        if (!id_entregadores) {
            return res.status(400).json({ error: 'O id_entregadores é obrigatório no corpo da requisição!' });
        }

        const pedido = await pedidos.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado!' });
        }
        if (pedido.id_status !== 2) {
            return res.status(400).json({ error: 'O pedido deve estar com status "Finalizado" para ser pego!' });
        }
        if(pedido.id_entregadores !== null) {
            return res.status(400).json({ error: 'Esse pedido não esta disponível para entrega!' });
        }

        await pedidos.update(
            { 
                id_status: 4, // Atualiza o status para "Saiu para entrega"
                id_entregadores: id_entregadores  // Atribui o entregador ao pedido
            },
            { where: { id } }
        );
        
        const pedidoAtualizado = await pedidos.findByPk(id);
        res.status(200).json({
            type: 'success',
            message: 'Pedido pego para entrega com sucesso!',
            data: pedidoAtualizado
        });

    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao pegar o pedido para entrega.',  
            data: error.message,
        });
    }
}

const getPedidosPendentes = async (req, res) => {
    try {
        const pedidosPendentes = await pedidos.findAll({
            where: { id_status: 2 }, // Status "Finalizado"
            include: [
                {
                    model: Pessoas,
                    as: 'pessoa',
                    attributes: ['nome', 'email']
                }
            ]
        });

        res.status(200).json({
            type: 'success',
            message: 'Pedidos pendentes listados com sucesso!',
            data: pedidosPendentes
        });
    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao listar os pedidos pendentes.',
            data: error.message,
        });
    }
}

export default{
    get,
    getById,
    create,
    update,
    destroy,
    postPegarPedido,
    getPedidosPendentes
};



