import express from "express";
import pessoasRoute from "./pessoasRoute.js";
import enderecosRoute from "./enderecoRoute.js";
import restaurantesRoute from "./restaurantesRoute.js";
import categoriasRoute from "./categoriasRoute.js";
import cuponsRoute from "./cuponsRoute.js";
import cardapiosRoute from "./cardapioRoute.js";
import carrinhosRoute from "./carrinhosRoute.js";
import entregadoresRoute from "./entregadoresRoute.js";
import favoritosRoute from "./favoritosRoute.js";
import pagamentosRoute from "./pagamentoRoute.js";
import pedidos from "./pedidosRoute.js";
import statusRoute from "./statusRoute.js";
import arquivosCardapioRoute from "./arquivosCardapioRoute.js";

const router = express.Router();

router.use(pessoasRoute);
router.use(enderecosRoute);
router.use(cuponsRoute);
router.use(restaurantesRoute);
router.use(categoriasRoute);
router.use(cardapiosRoute);
router.use(carrinhosRoute);
router.use(entregadoresRoute);
router.use(favoritosRoute);
router.use(pagamentosRoute);
router.use(pedidos);
router.use(statusRoute);
router.use(arquivosCardapioRoute);

export default router;
