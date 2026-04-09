import express from "express";
import pedidos from "../controllers/pedidosController.js";

const router = express.Router();

router.get('/pedidos/get-all', pedidos.get);
router.get('/pedidos/:id', pedidos.getById);
router.get('/pedidos/pessoas/:id_pessoas', pedidos.getByPessoaId);
router.get('/pedidos/prontosParaEntrega', pedidos.getDisponiveisParaEntrega);

// router.post('/pedidos/finalizar', pedidos.FinalizarPedido);

router.post('/pedidos/create', pedidos.create);

router.delete('/pedidos/destroy/:id', pedidos.destroy);

router.put('/pedidos/update/:id', pedidos.update);

export default router;
