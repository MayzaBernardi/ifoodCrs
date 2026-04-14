import express from 'express';
import arquivosCardapioController from '../controllers/arquivosCardapioController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyRestaurante from '../middlewares/verifyRestaurante.js';

const router = express.Router();

router.get('/arquivosCardapio/get-all', verifyToken, arquivosCardapioController.get);
router.get('/arquivosCardapio/restaurante/:id_restaurantes', verifyToken, verifyRestaurante, arquivosCardapioController.getByRestaurante);
router.delete('/arquivosCardapio/delete/:id', verifyToken, verifyRestaurante, arquivosCardapioController.destroyBancoEapi);

export default router;