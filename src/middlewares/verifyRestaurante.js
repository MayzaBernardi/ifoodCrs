import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize'; 
import { sequelize } from '../config/index.js'; 

const verifyRestaurante = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).send({
                message: 'Acesso negado! Token não fornecido.',
            });
        }

        const token = authHeader.split(` `) [1];

        const user = jwt.verify(token, process.env.SECRET_KEY);

        if (!user.idUsuario) {
            return res.status(401).send({
                message: 'Acesso negado! Token inválido.',
            });
        }   

        const verifyUserRestaurante = await sequelize.query(`
            SELECT papel as "nomePerfil"
            FROM perfis_usuario 
            WHERE id_pessoa = :userId 
            AND (papel = 'Restaurante' OR papel = 'restaurante')`, 
            {
                replacements: { userId: user.idUsuario }, 
                type: QueryTypes.SELECT            
            });

        if (verifyUserRestaurante.length === 0) {
            return res.status(403).send({
                message: 'Acesso restrito! Exclusivo para restaurantes.',
            });
        }

        return next();

    } catch (error) {
        return res.status(401).send({
            message: 'Ops! Token inválido ou expirado.',
            error: error.message,
        });
    }
};

export default verifyRestaurante;   