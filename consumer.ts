import * as amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "queue1"; // nama queue harus sama kek yang di produce
    channel.assertQueue(queue, {
      durable: false,
    });

    channel.consume(
      queue,
      (message) => {
        console.log(`this is your message`, message?.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
