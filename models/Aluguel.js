import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Inquilino } from './Inquilino.js';
import { Imovel } from './Imovel.js';

export const Aluguel = sequelize.define('aluguel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data_final: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: "alugueis"
  });

  Aluguel.belongsTo(Inquilino, {
    foreignKey: {
      name: 'inquilino_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })

  Aluguel.belongsTo(Imovel, {
    foreignKey: {
      name: 'imovel_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })