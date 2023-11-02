const { WebsocketStream } = require('@binance/connector');
const { addTrade } = require('./trade');

// Define callbacks for different events
const callbacks = {
  open: () => console.debug('Connected with Websocket server'),
  close: () => console.debug('Disconnected with Websocket server'),
  message: (data) => {
    const jsonData = JSON.parse(data);
    console.info(new Date(jsonData.E), jsonData);
  },
};

const wmSocketClient = new WebsocketStream({
  console,
  callbacks,
  proxy: {
    protocol: 'socks5',
    host: '127.0.0.1',
    port: 7890,
  },
});

wmSocketClient.aggTrade('btcusdt');
