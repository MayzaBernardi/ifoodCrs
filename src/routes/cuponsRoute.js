import express from "express";
import cuponsController from "../controllers/cuponsController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRestaurante from "../middlewares/verifyRestaurante.js";

const router = express.Router();

router.get('/cupons/get-all', verifyToken, cuponsController.get);
router.get('/cupons/:id', verifyToken, cuponsController.getById);

router.post('/cupons', verifyToken, verifyRestaurante, cuponsController.create);

router.put('/cupons/:id', verifyToken, verifyRestaurante, cuponsController.update);

router.delete('/cupons/:id', verifyToken, verifyRestaurante, cuponsController.destroy);

export default router;