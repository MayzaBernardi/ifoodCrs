import express from 'express';
import cardapiosController from '../controllers/cardapiosController.js';

const router = express.Router();

router.get('/cardapios/get-all', cardapiosController.get);
router.get('/cardapios/get-by-id/:id', cardapiosController.getById);
router.get('/cardapios/categorias/:id_categorias', cardapiosController.getByCategoria);
router.get('/cardapios/restaurantes/:id_restaurantes', cardapiosController.getByRestaurante);

router.post('/cardapios/create', cardapiosController.create);

router.delete('/cardapios/destroy/:id', cardapiosController.destroy);

router.put('/cardapios/update/:id', cardapiosController.update);

export default router;