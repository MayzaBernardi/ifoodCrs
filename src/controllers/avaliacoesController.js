import avaliacoes from "../models/AvaliacoesModel.js";

const get = async (req, res) => {
    try {
            const avaliacoes = await avaliacoes.findAll();
            res.status(200).json(avaliacoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar avaliações' });
        }
    }

const create = async (req, res) => {
    try {
            const { nota, comentario, id_pedidos } = req.body;
            const novaAvaliacao = await avaliacoes.create({ nota, comentario, id_pedidos });
            res.status(201).json(novaAvaliacao);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar avaliação' });
        }
    }

export default { get, create };