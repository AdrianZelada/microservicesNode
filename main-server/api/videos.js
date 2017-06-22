'use strict';

let parentRouter=require('../core/parent.router');
let Video= require('../schemas/videos');

class Videos extends parentRouter{
    get routes(){
        return{}
    }

    constructor(router,db){
        super(router,Video(db))
    }
}

module.exports = Videos;
