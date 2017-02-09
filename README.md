# Nodemailer AMQP example

This is an example of using RabbitMQ ([amqplib](http://www.squaremobius.net/amqp.node/)) for queueing [Nodemailer](https://nodemailer.com/) email messages. This allows you to push messages from your application quickly to delivery queue and let Nodemailer handle the actual sending asynchronously from a background process.

This example also demonstrates using different credentials for different messages using the same Nodemailer transport.

## Setup

Download files from Github

```
$ git clone git://github.com/nodemailer/nodemailer-amqp-example.git
$ cd nodemailer-amqp-example
```

Install required dependencies

```
$ npm install --production
```

Make sure that you have a RabbitMQ server running (default config assumes RabbitMQ running on localhost with default credentials) and also check the configuration options in [config.json](./config.json).

### Running

The example contains 3 different parts:

1. **Example SMTP server** ([server.js](./server.js)). This is where Nodemailer sends the messages to. The server prints message source to console and does not actually deliver anything
2. **Subscriber process** ([subscriber.js](./subscriber.js)). This is the worker process that fetches queued messages from RabbitMQ and delivers these using Nodemailer. You can spawn up as many subscriber processes as you want, even though a single one should be fine in most cases.
3. **Publisher process** ([publisher.js](./publisher.js)). This is an example application process that pushes message data to RabbitMQ for delivery. Normally it would be the job of your application.

Run all processes in different windows, using the following execution order:

```
$ npm run server
$ npm run subscribe
$ npm run publish
```

## Example

![](https://cldup.com/VJgbkWZQuS.png)
