const { Model, DataTypes } = require('sequelize');

class Contato extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            cidade: DataTypes.STRING,
            cep: DataTypes.STRING,
            endereco: DataTypes.STRING,
        }, {
            sequelize: sequelize,
            tableName: 'contatos'
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
}

module.exports = Contato;