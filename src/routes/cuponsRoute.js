import express from "express";
import cuponsController from "../controllers/cuponsController.js";

const router = express.Router();

router.get('/cupons/get-all', cuponsController.get);
router.get('/cupons/:id', cuponsController.getById);

router.post('/cupons', cuponsController.create);

router.put('/cupons/:id', cuponsController.update);

router.delete('/cupons/:id', cuponsController.destroy);

export default router;