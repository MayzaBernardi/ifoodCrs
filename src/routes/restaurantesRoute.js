import express from "express";
import restaurantesController from "../controllers/restaurantesController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRestaurante from "../middlewares/verifyRestaurante.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get('/restaurantes/get-all', verifyToken, restaurantesController.get);
router.get('/restaurantes/abertosAgora', verifyToken, restaurantesController.getByHorarioAndFavoritadoRaw);
router.get('/restaurantes/:id', verifyRestaurante, restaurantesController.getById);

router.post('/restaurantes/proximos', verifyToken, restaurantesController.postRestaurantesProximos);

router.post('/restaurantes/create', restaurantesController.create);
router.put('/restaurantes/:id', verifyRestaurante, restaurantesController.update);
router.delete('/restaurantes/:id', verifyAdmin, restaurantesController.destroy);

export default router;