import express from "express";
import enderecosController from "../controllers/enderecosController.js";
import restaurantesController from "../controllers/restaurantesController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRestaurante from "../middlewares/verifyRestaurante.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get('/enderecos', verifyToken, enderecosController.get); 
router.get('/enderecos/restaurantes', verifyToken, enderecosController.getRestaurantes); 

router.get('/enderecos/:id', verifyToken, enderecosController.getById);
router.get('/enderecos/restaurante/:id_restaurantes', verifyToken, enderecosController.getByRestaurante);

router.post('/enderecos/restaurante', verifyAdmin, enderecosController.createRestauranteEndereco);
router.post('/enderecos/pessoa', verifyAdmin, enderecosController.createEnderecoPessoa);

router.put('/enderecos/:id', verifyRestaurante,enderecosController.update);
router.delete('/enderecos/:id', verifyRestaurante, enderecosController.destroy);

export default router;