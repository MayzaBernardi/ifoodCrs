import express from 'express';
import cardapiosController from '../controllers/cardapiosController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyRestaurante from '../middlewares/verifyRestaurante.js';

const router = express.Router();

router.get('/cardapios/get-all', verifyToken, cardapiosController.get);
router.get('/cardapios/get-by-id/:id', verifyToken, cardapiosController.getById);
router.get('/cardapios/categorias/:id_categorias', verifyToken, cardapiosController.getByCategoria);
router.get('/cardapios/restaurantes/:id_restaurantes', verifyToken, cardapiosController.getByRestaurante);

router.post('/cardapios/create', verifyToken, verifyRestaurante, cardapiosController.create);

router.delete('/cardapios/destroy/:id', verifyToken, verifyRestaurante, cardapiosController.destroy);

router.put('/cardapios/update/:id', verifyToken, verifyRestaurante, cardapiosController.update);

export default router;