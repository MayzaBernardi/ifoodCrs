import express from "express";
import entregadoresController from "../controllers/entregadoresController.js";
import verifyColaborador from "../middlewares/verifyColaborador.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRestaurante from "../middlewares/verifyRestaurante.js";

const router = express.Router();

router.get('/entregadores/get-all', verifyRestaurante, verifyColaborador, entregadoresController.get);
router.get('/entregadores/:id', verifyRestaurante, entregadoresController.getById);
router.get('/entregadores/pedidos/pendentes', verifyColaborador, entregadoresController.getPedidosPendentes);


router.post('/entregadores/pegar-pedido/:id', verifyColaborador, entregadoresController.postPegarPedido);
router.post('/entregadores/create', verifyAdmin, entregadoresController.create);

router.delete('/entregadores/destroy/:id', verifyAdmin, entregadoresController.destroy);

router.put('/entregadores/update/:id', verifyAdmin, entregadoresController.update);

export default router;