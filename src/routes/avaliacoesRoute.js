import express from 'express';
import avaliacoesController from '../controllers/avaliacoesController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/avaliacoes/get-all', verifyToken, avaliacoesController.get);

router.post('/avaliacoes', verifyToken, avaliacoesController.create);

export default router;