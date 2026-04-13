import jwt from 'jsonwebtoken';
import Pessoas from '../models/PessoasModel.js'; 

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(403).send({
                type: 'error',
                message: 'Acesso negado! Cadê o token?',
                data: []
            });
        }

        const token = authHeader.split(' ');

        const usuarioDecodificado = jwt.verify(token, process.env.SECRET_KEY);

        const pessoaExiste = await Pessoas.findOne({
            where: {
                id: usuarioDecodificado.idUsuario 
            }
        });

        if (!pessoaExiste) {
            return res.status(403).send({
                type: 'error',
                message: 'Usuário não autenticado ou não existe mais!',
                data: []
            });
        }
        
        next(); 
        
    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Ops! O token é inválido ou expirou.',
            data: error.message,
        });
    }
};

export default verifyToken;