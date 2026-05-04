import Restaurantes from './RestaurantesModel.js';
import ArquivosCardapio from './ArquivosCardapioModel.js';

const setupAssociations = () => {
    Restaurantes.hasMany(ArquivosCardapio, { 
        foreignKey: 'id_restaurante' 
    });
    
    ArquivosCardapio.belongsTo(Restaurantes, { 
        foreignKey: 'id_restaurante' 
    });

    console.log('✅ Associações do banco de dados configuradas!');
};

export default setupAssociations;