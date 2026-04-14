import express from "express";
import pagamentos from "../controllers/pagamentoController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get('/pagamentos/get-all', verifyAdmin, pagamentos.get);

router.post('/pagamentos', verifyAdmin, pagamentos.create);


export default router;