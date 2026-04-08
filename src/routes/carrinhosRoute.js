import express from 'express';
import carrinhosController from '../controllers/carrinhosController.js';

const router = express.Router();

router.get('/carrinhos/get-all', carrinhosController.get);
router.get('/carrinhos/:id', carrinhosController.getById);
router.get('/carrinhos/pedido/:id_pedidos', carrinhosController.getByPedidoId);

router.post('/carrinhos', carrinhosController.create);

router.put('/carrinhos/:id', carrinhosController.update);

router.delete('/carrinhos/:id', carrinhosController.destroy);

export default router;