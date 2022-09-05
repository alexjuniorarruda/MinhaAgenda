const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');
const ContatoController = require('../controllers/ContatoController');

const routes = express.Router();

// Usuario
routes.post('/usuario/login', UsuarioController.login);
routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.selectByPk);
routes.post('/usuario', UsuarioController.create);
routes.put('/usuario/:id', UsuarioController.update);
routes.delete('/usuario/:id', UsuarioController.delete);

// Contato
routes.get('/usuario/:usuario_id/contato', ContatoController.index);
routes.get('/usuario/:usuario_id/contato/detalhado', ContatoController.selectDetails);
routes.post('/usuario/:usuario_id/contato', ContatoController.create);
routes.put('/usuario/:usuario_id/contato/:contato_id', ContatoController.update);
routes.delete('/usuario/:usuario_id/contato/:contato_id', ContatoController.delete);
routes.delete('/usuario/:usuario_id/contato', ContatoController.deleteByUser);

module.exports = routes;