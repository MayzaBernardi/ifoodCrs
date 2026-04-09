import express from "express";
import entregadoresController from "../controllers/entregadoresController.js";

const router = express.Router();

router.get('/entregadores/get-all', entregadoresController.get);
router.get('/entregadores/:id', entregadoresController.getById);

router.post('/entregadores/pegar-pedido/:id', entregadoresController.postPegarPedido);
router.post('/entregadores/create', entregadoresController.create);

router.delete('/entregadores/destroy/:id', entregadoresController.destroy);

router.put('/entregadores/update/:id', entregadoresController.update);

export default router;