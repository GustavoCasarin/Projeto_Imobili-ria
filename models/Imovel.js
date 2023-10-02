import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Proprietario } from './Proprietario.js';

export const Imovel = sequelize.define('imovel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    endereco: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: "imoveis"
  });

  
  Imovel.belongsTo(Proprietario, {
    foreignKey: {
      name: 'proprietario_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })

  Proprietario.hasMany(Imovel, {
    foreignKey: 'proprietario_id'
  })