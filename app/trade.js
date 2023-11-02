require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
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
    type: DataTypes.BIGINT,
    field: 'event_time',
  },
  s: {
    type: DataTypes.STRING,
    field: 'symbol',
  },
  a: {
    type: DataTypes.BIGINT,
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
    type: DataTypes.BIGINT,
    field: 'first_trade_id',
  },
  l: {
    type: DataTypes.BIGINT,
    field: 'last_trade_id',
  },
  T: {
    type: DataTypes.BIGINT,
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
const FuturesTrade = sequelize.define('futrues_agg_trade', AggTradeModel, {
  freezeTableName: true,
});

function addTrade(data) {
  return Trade.create(data);
}
function addFuturesTrade(data) {
  return FuturesTrade.create(data);
}

(async () => {
  await Trade.sync({ force: false }); // force:true => delete it if exists
  await FuturesTrade.sync({ force: false });
})();

module.exports.addTrade = addTrade;
module.exports.addFuturesTrade = addFuturesTrade;
