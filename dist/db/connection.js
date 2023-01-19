"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const parseEnvVars_1 = require("../utils/parseEnvVars");
const DB_USERNAME = (0, parseEnvVars_1.extractStringEnvVar)('DB_USERNAME');
const DB_PASSWORD = (0, parseEnvVars_1.extractStringEnvVar)('DB_PASSWORD');
const DB_HOST = (0, parseEnvVars_1.extractStringEnvVar)('DB_HOST');
const DB_DATABASE = (0, parseEnvVars_1.extractStringEnvVar)('DB_DATABASE');
const sequelize = new sequelize_1.Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    // logging: false
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map