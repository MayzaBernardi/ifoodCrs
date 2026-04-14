import express from "express";
import favoritosController from "../controllers/favoritosController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/favoritos/get-all', verifyToken, favoritosController.get);

router.delete('/favoritos/:id', verifyToken, favoritosController.destroy);

export default router;