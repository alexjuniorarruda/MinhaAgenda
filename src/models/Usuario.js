const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            usuario: DataTypes.STRING,
            senha: DataTypes.STRING,
        }, {
            sequelize: sequelize,
            tableName: 'usuarios'
        })
    }

    static associate(models) {
        this.hasMany(models.Contato, { foreignKey: 'usuario_id', as: 'contatos' });
    }
}

module.exports = Usuario;