import express from "express";
import statusController from "../controllers/statusController.js";

const router = express.Router();

router.get('/status/get-all', statusController.get);

router.post('/status/create', statusController.create);

export default router;