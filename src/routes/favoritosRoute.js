import express from "express";
import favoritosController from "../controllers/favoritosController.js";

const router = express.Router();

router.get('/favoritos/get-all', favoritosController.get);

router.delete('/favoritos/:id', favoritosController.destroy);

export default router;