const Usuario = require('../models/Usuario');
const Contato = require('../models/Contato');

module.exports = {
    async index(req, res) {       

        const contatos = await Contato.findAll({
            attributes: ['nome', 'telefone', 'email', 'cidade', 'cep', 'endereco']
        });        

        return res.json(contatos);
    },
    async selectDetails(req, res) {
        const contatos = await Contato.findAll();

        return res.json(contatos);
    },
    async create(req, res, next) {
        try {
            const { usuario_id } = req.params;
            const { nome, telefone, email, cidade, cep, rua, numero, bairro } = req.body;            
            const endereco = `${rua}, ${numero}, ${bairro}`;
            
            const usuario = await Usuario.count({
                where: {
                    id: usuario_id
                }
            });

            if (usuario < 1) {
                return res.status(400).json({ error: 'Usuário não encontrado.' });
            }

            await Contato.create({
                usuario_id,
                nome,
                telefone,
                email,
                cidade,
                cep,
                endereco,
            });            

            return res.status(201).send('Contato cadastrado com sucesso.');

        } catch (error) {
            next(error);
        }        
    },
    async update(req, res, next) {
        try {

            const id = req.params;
            const { nome, telefone, email, cidade, cep, endereco } = req.body;

            console.log(id);

            const contato = await Contato.update({ nome, telefone, email, cidade, cep, endereco }, {
                where: {
                    id: id['contato_id']
                }
            });

            if (contato == 0) {
                return res.status(200).send('Contato não encontrado.');
            } else {
                return res.status(200).send('Contato atualizado com sucesso.');
            }            

        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {            
            const id = req.params;
            
            const contato = await Contato.destroy({
                where: {
                    id: id['contato_id']
                }
            });

            if (contato == 0) {
                return res.status(200).send('Contato não encontrado.');
            } else {
                return res.status(200).send('Contato deletado com sucesso.');
            }            

        } catch (error) {
            next(error);
        }
    },
    async deleteByUser(req, res, next) {
        try {
            const id = req.params;
            
            const contato = await Contato.destroy({
                where: {
                    usuario_id: id['usuario_id']
                }
            });

            if (contato == 0) {
                return res.status(200).send('Usuario não encontrado.');
            } else {
                return res.status(200).send('Contato deletado com sucesso.')
            }

        } catch (error) {
            next(error);
        }
    }   
}