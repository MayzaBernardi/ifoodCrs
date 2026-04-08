import Pagamentos from "../models/PagamentosModel.js";
import Status from "../models/StatusModel.js";
import TipoPagamento from "../models/TipoPagamentoModel.js";

const get = async (req, res) => {
        try {
            const pagamentos = await Pagamentos.findAll({
                include: [
                    {
                        model: Status,
                        as: 'status'
                    },
                    {
                        model: TipoPagamento,
                        as: 'tipoPagamento'
                    }
                ]
            });
            res.status(200).json(pagamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    const create = async (req, res) => {
        try {
            const { id_status, id_tipo_pagamentos } = req.body;
            const pagamento = await Pagamentos.create({ id_status, id_tipo_pagamentos });
            res.status(201).json(pagamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
    }
}


export default { get, create };
