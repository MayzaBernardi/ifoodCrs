import express from "express";
import pagamentos from "../controllers/pagamentoController.js";

const router = express.Router();

router.get('/pagamentos/get-all', pagamentos.get);

router.post('/pagamentos', pagamentos.create);


export default router;