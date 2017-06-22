//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';
let mongoose = require('mongoose');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.mongoose=mongoose;
    this.connection= this.mongoose.connect(connectionSettings.host + connectionSettings.database)
  }
  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
