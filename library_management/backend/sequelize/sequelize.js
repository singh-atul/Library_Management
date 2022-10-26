const dotenv = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');

dotenv.config({ path: path.resolve(__dirname, '../../.env')});

module.exports = new Sequelize(process.env.DB_URL);
