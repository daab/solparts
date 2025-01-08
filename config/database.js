import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Validar variables de entorno
const requiredEnvVars = [
  'LOCAL_DB_NAME', 'LOCAL_DB_USER', 'LOCAL_DB_PASSWORD', 'LOCAL_DB_HOST', 'LOCAL_DB_PORT',
  'SERVER_DB_NAME', 'SERVER_DB_USER', 'SERVER_DB_PASSWORD', 'SERVER_DB_HOST', 'SERVER_DB_PORT'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
});

// Conexión a la base de datos local
const localSequelize = new Sequelize(
  process.env.LOCAL_DB_NAME,
  process.env.LOCAL_DB_USER,
  process.env.LOCAL_DB_PASSWORD,
  {
    host: process.env.LOCAL_DB_HOST,
    dialect: 'postgres',
    port: process.env.LOCAL_DB_PORT,
  }
);

// Conexión a la base de datos en el servidor
const serverSequelize = new Sequelize(
  process.env.SERVER_DB_NAME,
  process.env.SERVER_DB_USER,
  process.env.SERVER_DB_PASSWORD,
  {
    host: process.env.SERVER_DB_HOST,
    dialect: 'postgres',
    port: process.env.SERVER_DB_PORT,
    dialectOptions: {
      ssl: {
        require: true, // Cambia a true si tu servidor requiere SSL
        rejectUnauthorized: false, // Cambia a true si quieres verificar el certificado
      },
    },
  }
);

// Exportar las conexiones
export { localSequelize, serverSequelize };
