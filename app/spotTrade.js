const { WebsocketStream } = require('@binance/connector');
const { addTrade } = require('./trade');
const { logger } = require('./logger');

// Define callbacks for different events
const callbacks = {
  open: () => logger.info('Connected with Websocket server'),
  close: () => logger.info('Disconnected with Websocket server'),
  message: (data) => {
    const jsonData = JSON.parse(data);
    addTrade(jsonData);
  },
};

const wmSocketClient = new WebsocketStream({
  console,
  callbacks,
});

wmSocketClient.aggTrade('btcusdt');
wmSocketClient.aggTrade('solusdt');
wmSocketClient.aggTrade('frontusdt');
