import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "imobiliaria", "root", "011000", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});