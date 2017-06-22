/**
 * Created by iZel on 6/12/17.
 */
// #!/usr/bin/env node

let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertQueue('rpc_queue', {durable: false});
        console.log(' [x] Awaiting RPC requests');
        ch.consume('rpc_queue', function reply(msg) {
            let n = parseInt(msg.content.toString());
            let r = fibonacci(n);
            console.log(r)
            ch.sendToQueue(msg.properties.replyTo,
                new Buffer(r.toString()),
                {correlationId: msg.properties.correlationId});
            ch.ack(msg);
        });

        function fibonacci(n) {
            if (n === 0 || n === 1)
                return n;
            else
                return fibonacci(n - 1) + fibonacci(n - 2);
        }
    });
});


