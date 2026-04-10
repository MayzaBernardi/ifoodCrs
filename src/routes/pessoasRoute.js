import express from "express";
import pessoasController from "../controllers/pessoasController.js";

const router = express.Router();

router.get('/pessoas/get-all', pessoasController.get);

router.get('/pessoas/get-by-id/:id', pessoasController.getById);

router.post('/pessoas/create', pessoasController.create);

router.put('/pessoas/update/:id', pessoasController.update);

router.delete('/pessoas/delete/:id', pessoasController.destroy);

export default router;
