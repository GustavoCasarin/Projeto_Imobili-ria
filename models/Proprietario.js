import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Proprietario = sequelize.define('proprietario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
 },
   nascimento: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  rg: {
    type: DataTypes.STRING(12),
    allowNull: false
  }
});