import express from "express";
import pessoasRoute from "./pessoasRoute.js";
import enderecosRoute from "./enderecoRoute.js";
import restaurantesRoute from "./restaurantesRoute.js";
import categoriasRoute from "./categoriasRoute.js";
import cuponsRoute from "./cuponsRoute.js";

const router = express.Router();

router.use(pessoasRoute);
router.use(enderecosRoute);
router.use(cuponsRoute);
router.use(restaurantesRoute);
router.use(categoriasRoute);

export default router;
