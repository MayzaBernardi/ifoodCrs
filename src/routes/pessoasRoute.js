import express from "express";
import pessoasController from "../controllers/pessoasController.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post('/pessoas/login', pessoasController.login);
router.post('/pessoas/register', pessoasController.register);


router.get('/pessoas/get-all', verifyToken, pessoasController.get);

router.get('/pessoas/get-by-id/:id', verifyToken, pessoasController.getById);

router.put('/pessoas/update/:id', verifyAdmin, pessoasController.update);


router.delete('/pessoas/delete/:id', verifyAdmin, pessoasController.destroy);

router.post('/pessoas/:id/perfil', verifyAdmin, pessoasController.delegarPerfil);


export default router;