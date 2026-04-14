import express from "express";
import categoriaController from "../controllers/categoriaController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/categorias/get-all', verifyToken, categoriaController.get);
router.get('/categorias/:id', verifyToken, categoriaController.getById);

router.post('/categorias', verifyToken, categoriaController.create);

router.delete('/categorias/:id', verifyToken, categoriaController.destroy);

export default router;