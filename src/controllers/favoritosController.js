import favoritos from '../models/FavoritosModel.js';

const get = async (req, res) => {
    try {
        const favoritosList = await favoritos.findAll();
        res.status(200).json(favoritosList);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os favoritos.' });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id deve ser um número!' });
        }
        const favorito = await favoritos.findByPk(id);
        if (!favorito) {
            return res.status(404).json({ error: 'Favorito não encontrado!' });
        }
        await favorito.destroy();
        res.status(200).json({ message: 'Favorito excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o favorito.' });
    }
};

export default { get, destroy };