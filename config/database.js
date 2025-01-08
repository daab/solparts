// filepath: /c:/www/solparts/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'daab54ccn56', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Asegúrate de que el puerto sea correcto
});

export default sequelize;