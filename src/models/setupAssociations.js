import Restaurantes from './RestaurantesModel.js';
import ArquivosCardapio from './ArquivosCardapioModel.js';
import Cardapios from './CardapiosModel.js'; 
import Pedidos from './PedidosModel.js';
import Status from './StatusModel.js';
import Pagamentos from './PagamentosModel.js';
import Carrinhos from './CarrinhosModel.js';
import Entregadores from './EntregadoresModel.js';

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

    Pedidos.belongsTo(Status, { foreignKey: 'id_status', as: 'status_pedido' });

    Pedidos.belongsTo(Pagamentos, { foreignKey: 'id_pagamento', as: 'pagamento_pedido' });

    Pedidos.belongsTo(Entregadores, { foreignKey: 'id_entregadores', as: 'entregador' });

    Pedidos.hasMany(Carrinhos, { foreignKey: 'id_pedidos', as: 'itens_sacola' });

    Carrinhos.belongsTo(Cardapios, { foreignKey: 'id_cardapios', as: 'produto' });

    console.log('✅ Associações do banco de dados configuradas e corrigidas!');
};

export default setupAssociations;