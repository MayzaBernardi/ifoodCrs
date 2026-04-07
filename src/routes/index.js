import express from "express";
import pessoasRoute from "./pessoasRoute.js";
import enderecosRoute from "./enderecoRoute.js";


const router = express.Router();

router.use(pessoasRoute);
router.use(enderecosRoute);

export default router;
