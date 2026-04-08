import express from "express";
import enderecosController from "../controllers/enderecosController.js";
import restaurantesController from "../controllers/restaurantesController.js";

const router = express.Router();

router.get('/enderecos', enderecosController.get); 
router.get('/enderecos/restaurantes', enderecosController.getRestaurantes); 

router.get('/enderecos/:id', enderecosController.getById);
router.get('/enderecos/restaurante/:id_restaurantes', enderecosController.getByRestaurante);

router.post('/enderecos/restaurante', enderecosController.createRestauranteEndereco);
router.post('/enderecos/pessoa', enderecosController.createEnderecoPessoa);

router.put('/enderecos/:id', enderecosController.update);
router.delete('/enderecos/:id', enderecosController.destroy);

export default router;