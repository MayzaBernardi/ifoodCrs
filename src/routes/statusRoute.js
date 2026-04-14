import express from "express";
import statusController from "../controllers/statusController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get('/status/get-all', verifyAdmin, statusController.get);

router.post('/status/create', verifyAdmin, statusController.create);

export default router;