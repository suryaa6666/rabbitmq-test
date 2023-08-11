import * as amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "queue1";
    const message = "Hello bang!";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`message : ${message} sent to queue : ${queue}`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
