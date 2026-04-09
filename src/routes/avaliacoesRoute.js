import express from 'express';
import avaliacoesController from '../controllers/avaliacoesController.js';

const router = express.Router();

router.get('/avaliacoes/get-all', avaliacoesController.get);

router.post('/avaliacoes', avaliacoesController.create);

export default router;