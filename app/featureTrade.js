const UMStream = require('@binance/futures-connector/src/modules/websocket/UMStream');
const { logger } = require('./logger');
const { addFetureTrade } = require('./trade');

// Define callbacks for different events
const callbacks = {
  open: () => logger.info('Connected Feture Websocket server'),
  close: () => logger.info('Disconnected Feture Websocket server'),
  message: (data) => {
    const jsonData = JSON.parse(data);
    addFetureTrade(jsonData);
  },
};

const wmSocketClient = new UMStream({
  logger,
  callbacks,
  wsURL: 'wss://fstream.binance.com',
});

wmSocketClient.aggregateTradeStream('btcusdt');
wmSocketClient.aggregateTradeStream('solusdt');
wmSocketClient.aggregateTradeStream('frontusdt');
