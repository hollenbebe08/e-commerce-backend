// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means their needs to be at least four characters in the product description
        len: [4]
      }
    },
    Price: {
      // decimal
      type: DataTypes.DECIMAL,
      // doesn't allow null values
      allowNull: false,
      // validates that the value is a decimal
      validate: {
        isDecimal: true, 
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //set as default value of ten
      defaultValue: 10,
      //validates that the value is numeric
      validate: {
        not: ["[a-z]",'i'],
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      //reference's the category's model id
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
