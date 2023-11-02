require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const TradeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  e: DataTypes.STRING,
  E: DataTypes.INTEGER,
  s: DataTypes.STRING,
  a: DataTypes.INTEGER,
  p: DataTypes.STRING,
  q: DataTypes.STRING,
  f: DataTypes.INTEGER,
  l: DataTypes.INTEGER,
  T: DataTypes.INTEGER,
  m: DataTypes.BOOLEAN,
  M: DataTypes.BOOLEAN,
};

const Trade = sequelize.define('Trade', TradeModel);
const FetureTrade = sequelize.define('FetureTrade', TradeModel);

function addTrade(data) {
  return Trade.create(data);
}
function addFetureTrade(data) {
  return FetureTrade.create(data);
}

module.exports.addTrade = addTrade;
module.exports.addFetureTrade = addFetureTrade;
