const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Contato = require('../models/Contato');

const connection = new Sequelize(dbConfig);

Usuario.init(connection);
Contato.init(connection);

Usuario.associate(connection.models);
Contato.associate(connection.models);

module.exports = connection;