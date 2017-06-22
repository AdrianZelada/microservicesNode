//	index.js
//
//  Entrypoint to the application. Opens a repository to the MySQL
//  server and starts the server.
let conn=require('./main-server/communication/conn').default(['email','rpc_queue','response.fib']);
var server = require('./main-server/server');
var repository = require('./main-server/repository/repository');
var config = require('./config/config');

//  Lots of verbose logging when we're starting up...
console.log("--- Customer Service---");
console.log("Connecting to customer repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {
  console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){
  console.error('Unhandled Rejection', err);
});

repository.connect({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
}).then((repo) => {
    return server.start({
      port: config.port,
      db: repo,
    });
}).then((app)=>{
    app.on('close', () => {
        repository.disconnect();
    });
});