require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const AggTradeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  e: {
    type: DataTypes.STRING,
    field: 'type',
  },
  E: {
    type: DataTypes.INTEGER,
    field: 'event_time',
  },
  s: {
    type: DataTypes.STRING,
    field: 'symbol',
  },
  a: {
    type: DataTypes.INTEGER,
    field: 'agg_trade_id',
  },
  p: {
    type: DataTypes.DOUBLE,
    field: 'price',
  },
  q: {
    type: DataTypes.DOUBLE,
    field: 'amount',
  },
  f: {
    type: DataTypes.INTEGER,
    field: 'first_trade_id',
  },
  l: {
    type: DataTypes.INTEGER,
    field: 'last_trade_id',
  },
  T: {
    type: DataTypes.INTEGER,
    field: 'trade_time',
  },
  m: {
    type: DataTypes.BOOLEAN,
    field: 'is_buy_maker',
  },
  M: {
    type: DataTypes.BOOLEAN,
    field: 'm_unuseful',
  },
};

const Trade = sequelize.define('agg_trade', AggTradeModel, { freezeTableName: true });
const FetureTrade = sequelize.define('fetrue_agg_trade', AggTradeModel, { freezeTableName: true });

function addTrade(data) {
  return Trade.create(data);
}
function addFetureTrade(data) {
  return FetureTrade.create(data);
}

(async () => {
  await Trade.sync({ force: false }); // force:true => delete it if exists
  await FetureTrade.sync({ force: false });
})();

module.exports.addTrade = addTrade;
module.exports.addFetureTrade = addFetureTrade;
