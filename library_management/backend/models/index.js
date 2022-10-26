const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/sequelize');

module.exports = {
    User: require('./user')(sequelize, DataTypes),
    Author: require('./author')(sequelize, DataTypes),
    Loan: require('./loan')(sequelize, DataTypes),
    Book: require('./book')(sequelize, DataTypes),
    Notification: require('./notification')(sequelize, DataTypes)
}