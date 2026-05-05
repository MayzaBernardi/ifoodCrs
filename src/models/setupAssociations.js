import Restaurantes from './RestaurantesModel.js';
import ArquivosCardapio from './ArquivosCardapioModel.js';
import Cardapios from './CardapiosModel.js'; 

const setupAssociations = () => {

    Restaurantes.hasMany(ArquivosCardapio, { 
        foreignKey: 'id_restaurantes', 
        as: 'arquivos_cardapios'       
    });
    
    ArquivosCardapio.belongsTo(Restaurantes, { 
        foreignKey: 'id_restaurantes',
        as: 'restaurante'
    });

    
    Cardapios.hasMany(ArquivosCardapio, {
        foreignKey: 'id_cardapios', 
        as: 'arquivos_cardapios' 
    });

    ArquivosCardapio.belongsTo(Cardapios, {
        foreignKey: 'id_cardapios',
        as: 'cardapio'
    });

    console.log('✅ Associações do banco de dados configuradas e corrigidas!');
};

export default setupAssociations;