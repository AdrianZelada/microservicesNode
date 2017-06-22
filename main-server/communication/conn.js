/**
 * Created by iZel on 6/13/17.
 */
var amqp = require('amqplib/callback_api');
var config = require('../../config/config')
var instance = null;

class Connect {
    constructor(queue){
        if(!instance){
            let _this=this;
            amqp.connect(config.rabbit.host,(e,conn)=>{
                _this.conn=conn;
                _this.queue=queue;
                _this.ch={};
                _this._createChannel(_this.conn);
            });
            instance =this;
        }
        return instance;
    }


    _createChannel(conn){
        conn.createChannel( (e,ch) =>{
            this.queue.forEach(function (val) {
                ch.assertQueue(val,{durable:false})
            });
            this.ch=ch;
        });
    }

    sendToQueue(queue,data){
        this.ch.sendToQueue(queue, new Buffer(JSON.stringify(data)))
    }

    sendRPC(queue,num,cb){
        this.ch.assertQueue('',{exclusive:true} ,(err,q)=>{
            this.ch.consume(q.queue, (msg)=>{
                console.log(' [.] Got %s', msg.content.toString());
                cb(msg.content.toString())
                this.ch.deleteQueue(q.queue,{ifEmpty:true})
            }, {noAck: true});
            this.ch.sendToQueue(queue,
                new Buffer(num.toString()),
                { correlationId: q.queue, replyTo:q.queue});
        });
    }

    static default(queue){
        return new Connect(queue)
    }
}

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

module.exports=Connect;