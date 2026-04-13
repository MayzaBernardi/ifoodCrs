const create = async (req, res) => {
    try {
        const { nome, email, senha, cpf, dataNascimento } = req.body;

        if(!nome){
            return res.status(400).send({
                type: 'error',
                message: 'O nome é obrigatório!',
                data: null,
            });
        }

        
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const retorno = await Pessoas.create({
            nome,
            email,
            senha: senhaHash, 
            cpf,
            dataNascimento
        });

        
        const pessoaData = retorno.toJSON();
        delete pessoaData.senha;

        return res.status(201).send({
            type: 'success',
            message: 'Pessoa criada com sucesso!',
            data: pessoaData, 
        });

    } catch(error){
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao criar a pessoa.',
            data: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(isNaN(id)){
            return res.status(400).send({
                type: 'error',
                message: 'O id deve ser um número!',
                data: null,
            });
        }

        const pessoa = await Pessoas.findByPk(id);

        if(!pessoa){
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada!',
                data: null,
            });
        }

        if (req.body.senha) {
            const saltRounds = 10;
            req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
        }

        Object.keys(req.body).forEach(key => {
            if (['nome', 'email', 'senha', 'cpf', 'dataNascimento'].includes(key)) {
                pessoa[key] = req.body[key];
            }
        });

        await pessoa.save();

        const pessoaData = pessoa.toJSON();
        delete pessoaData.senha; 

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa atualizada com sucesso!',
            data: pessoaData,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro ao atualizar a pessoa, revise o id e tente novamente.',
            data: error.message,
        });
    }
}