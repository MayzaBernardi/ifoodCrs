import 'dotenv/config';
import express from "express";
import routes from "./routes/index.js";
import './models/index.js';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json({
    limit: '50mb'
}));


app.use(fileUpload({ 
    createParentPath: true 
}));

app.use('/public', express.static('public'));

app.use(routes);


app.listen(process.env.API_PORT, () => {
    console.log(`Sistema rodando na porta ${process.env.API_PORT}`);
});

export default app;