import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize'; 
import { sequelize } from '../config/index.js'; 

const verifyAdmin = async (req, res, next) => {
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

            const verifyUserAdmin = await sequelize.query(`
            SELECT papel as "nomePerfil"
            FROM perfis_usuarios
            WHERE id = :userId 
            AND (papel = 'Admin' OR papel = 'admin')`, 
            {
            replacements: { userId: user.idUsuario }, 
            type: QueryTypes.SELECT            
        });

        if (verifyUserAdmin.length === 0) {
            return res.status(403).send({
                message: 'Acesso restrito! Exclusivo para administradores.',
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

export default verifyAdmin;