import status from "../models/StatusModel.js";

const get = async (req, res) => {
    try {
        const statusList = await status.findAll();
        res.status(200).json(statusList);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os status.' });
    }
};

const create = async (req, res) => {
    try {
        const { nome } = req.body;
        const novoStatus = await status.create({ nome });
        res.status(201).json(novoStatus);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o status.' });
    }
};

export default { get, create };