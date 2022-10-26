'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User);
      this.hasMany(models.Book);
    }
  };
  Loan.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    approvedOn: DataTypes.DATE,
    expiredOn: DataTypes.DATE,
    deletedOn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loan',
  });
  return Loan;
};