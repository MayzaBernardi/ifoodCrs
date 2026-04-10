import arquivosCardapio from '../models/ArquivosCardapioModel.js';
import restaurantes from '../models/RestaurantesModel.js';

const get = async (req, res) => {
    try {
        const arquivos = await arquivosCardapio.findAll();
        return res.status(200).json(arquivos);
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Erro ao buscar arquivos do cardápio' });
    }
}

const getByRestaurante = async (req, res) => {
    try {
    
        const { id_restaurantes } = req.params; 

        const arquivos = await arquivosCardapio.findAll({
            where: { 
                id_restaurante: id_restaurantes 
            }
        });
        
        return res.status(200).json(arquivos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar arquivos do cardápio' });
    }
}

const destroyBancoEapi = async (req, res) => {
    try {
        const { id } = req.params;
        const arquivo = await arquivosCardapio.findByPk(id);

        const filePath = arquivo.caminho_arquivo;
        if (filePath) {
            const fs = await import('fs');
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Erro ao excluir arquivo do cardápio:', err);
                } else {
                    console.log('Arquivo do cardápio excluído com sucesso');
                }
            });
        }

        if (!arquivo) {
            return res.status(404).json({ error: 'Arquivo do cardápio não encontrado' });
        }

        await arquivo.destroy();
        return res.status(200).json({ message: 'Arquivo do cardápio excluído com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao excluir arquivo do cardápio' });
    }
}

export default {
    get,
    getByRestaurante,
    destroyBancoEapi
};  

