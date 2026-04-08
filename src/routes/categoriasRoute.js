import express from "express";
import categoriaController from "../controllers/categoriaController.js";

const router = express.Router();

router.get('/categorias/get-all', categoriaController.get);
router.get('/categorias/:id', categoriaController.getById);

router.post('/categorias', categoriaController.create);

router.delete('/categorias/:id', categoriaController.destroy);

export default router;