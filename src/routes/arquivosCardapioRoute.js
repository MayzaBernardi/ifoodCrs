import express from 'express';
import arquivosCardapioController from '../controllers/arquivosCardapioController.js';

const router = express.Router();

router.get('/arquivosCardapio/get-all', arquivosCardapioController.get);
router.get('/arquivosCardapio/restaurante/:id_restaurantes', arquivosCardapioController.getByRestaurante);
router.delete('/arquivosCardapio/delete/:id', arquivosCardapioController.destroyBancoEapi);

export default router;