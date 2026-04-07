import express from "express";
import pessoasController from "../controllers/pessoasController.js";

const router = express.Router();

router.get('/pessoas/get-all', pessoasController.get);

export default router;
