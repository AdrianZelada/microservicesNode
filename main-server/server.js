//  server.js

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var Groups=require('./api/groups');
var Videos=require('./api/videos');
var Users=require('./api/users');
var MathsRoutes=require('./api/math');

var Middleware=require('./communication/middleware')

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a repository and port provided.
    if(!options.db) throw new Error("A server must be started with a connected repository.");
    if(!options.port) throw new Error("A server must be started with a port.");

    //  Create the app, add some logging.
    let app = express();


    let ModelGroups= new Groups(express.Router(),options.db);
    let ModelVideos= new Videos(express.Router(),options.db);
    let ModelUsers= new Users(express.Router(),options.db);
    let ModelMath= new MathsRoutes(express.Router());

    app.use(morgan('dev'));
    app.use(Middleware.middlewareAfter({
        '/users/email':{
            method:'get',
            fn:'callbackEmail',
            model:ModelUsers
        },
        '/groups':{
            method:'get',
            fn:'callbackList',
            model:ModelGroups
        }
    }));
    app.use(Middleware.middlewareBefore({
        '/math/fibonacci':{
            method:'get',
            fn:'microFibonacci',
            model:ModelMath
        }
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //  Add the APIs to the app.

    app.use('/groups',ModelGroups.router);
    app.use('/videos',ModelVideos.router);
    app.use('/users',ModelUsers.router);
    app.use('/math',ModelMath.router);


    //  Start the app, creating a running server which we return.
    let server = app.listen(options.port, () => {
      resolve(server);
    });

  });



    function modifyResponseBody(req, res, next) {
        let oldJson = res.json;

        res.json = function(data){
            // arguments[0] (or `data`) contains the response body
            // arguments[0] = "modified : " + arguments[0];
            oldJson.apply(res, arguments);

            // res.status(500).send('error')
        };
        next();
    }

};