import express from "express";
import pedidos from "../controllers/pedidosController.js";

const router = express.Router();


router.get('/pedidos/get-all', pedidos.get);
router.get('/pedidos/prontos', pedidos.getDisponiveisParaEntrega);

router.get('/pedidos/pessoas/:id_pessoas', pedidos.getByPessoaId);
router.get('/pedidos/:id', pedidos.getById);

router.post('/pedidos/finalizar/:id', pedidos.PostFinalizarPedido);
router.post('/pedidos/create', pedidos.create);
router.delete('/pedidos/destroy/:id', pedidos.destroy);
router.put('/pedidos/update/:id', pedidos.update);

export default router;
