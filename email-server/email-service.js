/**
 * Created by iZel on 6/22/17.
 */
'use strict';

let nodemailer = require('nodemailer');
let config = require('../config/config');

class emailService{
    static mailTransport(emailData) {
        let smtpTransport = nodemailer.createTransport({
            service: config.email.service,  // sets automatically host, port and connection security settings
            auth: {
                user: config.email.userEmail,
                pass: config.email.userPass
            },
            secure:true,
            port:config.ports.http,
            host:config.email.host
        });

        smtpTransport.sendMail({  //email options
            from: "zelada.torreza@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
            to: emailData.email,
            subject: "Microservices Test", // subject
            text: " Test email Microservices", // body
            context:{}
        }, function(error, response,data){  //callback
            if(error){
                console.log('error');
                console.log(error);
            }else{
                console.log("Message sent: ",response);
            }
            smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
        });
    }
}

module.exports=emailService;
