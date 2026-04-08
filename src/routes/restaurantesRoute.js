import express from "express";
import restaurantesController from "../controllers/restaurantesController.js";

const router = express.Router();

router.get('/restaurantes/get-all', restaurantesController.get);
router.get('/restaurantes/:id', restaurantesController.getById);
router.get('/restaurantes/:id_categoria', restaurantesController.getByCategoria);
router.get('/restaurantes/abertosAgora', restaurantesController.getByHorarioAndFavoritadoRaw);

router.post('/restaurantes', restaurantesController.create);

router.put('/restaurantes/:id', restaurantesController.update);

router.delete('/restaurantes/:id', restaurantesController.destroy);

export default router;