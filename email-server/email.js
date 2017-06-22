/**
 * Created by iZel on 6/12/17.
 */
// #!/usr/bin/env node

let amqp = require('amqplib/callback_api');
let serviceEmail = require('./email-service');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue('email', {durable: false});
        ch.consume('email', function(msg) {
            console.log(" [x] Received ");
            console.log(JSON.parse(msg.content));
            let sendEmail=JSON.parse(msg.content)
            serviceEmail.mailTransport(sendEmail)
        }, {noAck: true});
    });
});


