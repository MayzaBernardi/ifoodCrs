import express from 'express';
import carrinhosController from '../controllers/carrinhosController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/carrinhos/get-all', verifyToken, carrinhosController.get);
router.get('/carrinhos/:id', verifyToken, carrinhosController.getById);
router.get('/carrinhos/pedido/:id_pedidos', verifyToken, carrinhosController.getByPedidoId);

router.post('/carrinhos', verifyToken, carrinhosController.create);

router.put('/carrinhos/:id', verifyToken, carrinhosController.update);

router.delete('/carrinhos/:id', verifyToken, carrinhosController.destroy);

export default router;