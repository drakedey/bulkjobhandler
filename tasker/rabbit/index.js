const rabbit = require('amqplib');

const startConnection = async () => {
  const connection = await rabbit.connect(
    process.env.RABBIT_CON || 'amqp://localhost:5672'
  );
  return connection;
};

const bail = (err) => {
  console.error(err);
  process.exit(1);
};

const publisher = (conn, message, q, callback) => {
  conn
    .createChannel()
    .then((err, ch) => on_open(ch, err))
    .catch((err) => (callback ? callback(err, null) : bail(err)));
  function on_open(err, ch) {
    if (err) bail(err);
    ch.assertQueue(q, { durable: true }).then(() => {
      ch.sendToQueue(q, Buffer.from(message));
      if (callback) callback(null, message);
    });
  }
};

// Consumer
const consumer = (conn, q, callback) => {
  conn
    .createChannel()
    .then((err, ch) => on_open(ch, err))
    .catch((err) => (callback ? callback(err, null) : bail(err)));
  function on_open(err, ch) {
    ch.assertQueue(q, { durable: true }).then(() => {
      ch.consume(q, function (msg) {
        if (msg !== null) {
          if(callback) callback(null, msg.content.toString())
          ch.ack(msg);
        }
      });
    });
  }
};

module.exports = { publisher, startConnection, consumer };
