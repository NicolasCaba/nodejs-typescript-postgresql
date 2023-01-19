import { Sequelize } from "sequelize";
import { extractStringEnvVar } from "../utils/parseEnvVars";

const DB_USERNAME = extractStringEnvVar('DB_USERNAME');
const DB_PASSWORD = extractStringEnvVar('DB_PASSWORD');
const DB_HOST = extractStringEnvVar('DB_HOST');
const DB_DATABASE = extractStringEnvVar('DB_DATABASE');

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    // logging: false
});

export default sequelize;


