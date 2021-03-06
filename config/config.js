//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {
	port: process.env.PORT || 5000,
  db: {
    host: 'mongodb://localhost/',
    // database: 'mean2',
    database: 'microservicesDB',
    user: 'users_service',
    password: '123',
    port: 3306
  },
    email:{
        'service':'Gmail',
        'userEmail':'xxxx@gmail.com',
        'userPass':'send.xxxxx',
        host:'localhost',
    },
    'ports' : {
        'http' : 3000
    },

  rabbit:{
	host: 'amqp://localhost'
  }
};
