const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res, next) {
        try {   
            const usuarios = await Usuario.findAll();  

            return res.json(usuarios);

        } catch (error) {
            next(error);
        }
        
    },
    async selectByPk(req, res, next) {
        try {
            const id = req.params;

            const usuario = await Usuario.findByPk(id['id']);

            if (usuario === null) {
                return res.send('Usuário não encontrado.')
            } else {
                return res.json(usuario);
            }

        } catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const { usuario, senha } = req.body;

            const retorno = await Usuario.findAll({
                where: {
                    usuario: usuario
                },
                attributes: ['usuario', 'senha']
            });

            const retornoUsuario = retorno.map(a => a.usuario);           

            if (retornoUsuario[0] == null) {
                return res.send('Usuário não encontrado.')
            }
            
            const retornoSenha = retorno.map(a => a.senha);  

            try {
                if (await bcrypt.compare(senha, retornoSenha[0])) {
                    return res.send('Login feito com sucesso.')
                } else {
                    return res.send('Falha ao efetuar login.')
                }
            } catch (error) {
              return res.status(500).send();   
            }     

        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try {
            const { usuario, senha } = req.body;                            
            const hashedPassword = await bcrypt.hash(senha, 10);

            await Usuario.create({ usuario: usuario, senha: hashedPassword });            

            return res.status(201).send('Usuário criado com sucesso.');
               
        } catch (error) {
            next(error);
        }        
    },
    async update(req, res, next) {
        try {
            const id = req.params;            
            const { nome, senha } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);
            await Usuario.update({ nome: nome, senha: hashedPassword }, {
                where: {
                    id: id['id']
                }
            });                       

            return res.status(200).send('Usuário alterado com sucesso.');

        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            const id = req.params;            
            
            await Usuario.destroy({
                where: {
                    id: id['id']
                }
            });

            return res.status(200).send('Usuário deletado com sucesso.')

        } catch (error) {
            next(error);
        }
    }
}