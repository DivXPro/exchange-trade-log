const UMStream = require('@binance/futures-connector/src/modules/websocket/UMStream');
const { logger } = require('./logger');

// Define callbacks for different events
const callbacks = {
  open: () => logger.info('Connected Feture Websocket server'),
  close: () => logger.info('Disconnected Feture Websocket server'),
  message: (data) => {
    logger.info(new Date(jsonData.E), jsonData);
  },
};

const wmSocketClient = new UMStream({
  logger,
  callbacks,
  wsURL: 'wss://fstream.binance.com',
});

wmSocketClient.aggregateTradeStream('btcusdt');
wmSocketClient.aggregateTradeStream('solusdt');
