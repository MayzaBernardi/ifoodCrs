import express from "express";
import pedidos from "../controllers/pedidosController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRestaurante from "../middlewares/verifyRestaurante.js";

const router = express.Router();


router.get('/pedidos/get-all', verifyToken, verifyRestaurante, pedidos.get);
router.get('/pedidos/prontos', verifyToken, verifyRestaurante, pedidos.getDisponiveisParaEntrega);

router.get('/pedidos/pessoas/:id_pessoas', verifyToken, pedidos.getByPessoaId);
router.get('/pedidos/:id', verifyToken, verifyRestaurante, pedidos.getById);

router.post('/pedidos/finalizar/:id', verifyToken, pedidos.PostFinalizarPedido);
router.post('/pedidos/create', verifyToken, pedidos.create);
router.delete('/pedidos/destroy/:id', verifyToken, pedidos.destroy);
router.put('/pedidos/update/:id', verifyToken, pedidos.update);

export default router;
