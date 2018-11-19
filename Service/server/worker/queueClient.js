var amqp = require('amqplib/callback_api');
let url = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

var createQueueChannel = function(queue, cb) {
  amqp.connect(url, onceConnected);

  function onceConnected(err, conn) {
    if (err) {
      return cb('error connecting to rabbitmq', null);
    }       else {
      conn.createChannel(onceChannelCreated);
    }

    function onceChannelCreated(err, channel) {
      if (err) {

      }           else {
        channel.assertQueue(queue, {durable: true}, onceQueueCreated);
      }

      function onceQueueCreated(err) {
        if (err) {
           return cb('Error creating queue', null);
         }               else {
           return cb(null, channel, conn);
         }
      }
    }
  }
};

module.exports = createQueueChannel;
