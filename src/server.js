import 'dotenv/config';
import express from "express";
import routes from "./routes/index.js";
import './models/index.js';

const app = express();
app.use(express.json());

app.use(routes);


app.listen(process.env.API_PORT, () => {
    console.log(`Sistema rodando na porta ${process.env.API_PORT}`);
});