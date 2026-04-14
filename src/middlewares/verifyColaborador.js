import jwt from 'jsonwebtoken';
import PerfilUsuario from '../models/PerfilUsuarioModel.js';

const verifyColaborador = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(403).send({
                type: 'error',
                message: 'Acesso negado! Cadê o token?',
                data: []
            });
        }

        
        const token = authHeader.split(` `) [1];

        const usuarioDecodificado = jwt.verify(token, process.env.SECRET_KEY);

        
        const perfilColaborador = await PerfilUsuario.findOne({
            where: {
                id_pessoa: usuarioDecodificado.idUsuario,
                papel: ['entregador', 'admin']
            }
        });

        if (!perfilColaborador) {
            return res.status(403).send({
                type: 'error',
                message: 'Acesso restrito! Exclusivo para entregadores colaboradores.',
                data: []
            });
        }
        
        
        next(); 
        
    } catch (error) {
        
        console.error("Erro no verifyColaborador:", error.message);
        
        return res.status(401).send({
            type: 'error',
            message: 'Ops! O token é inválido ou expirou.',
            data: error.message
        });
    }
};

export default verifyColaborador;