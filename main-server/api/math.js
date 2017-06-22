'use strict';

let parentRouter=require('../core/parent.router');
let conn = require('../communication/conn').default();

class MathLibrery extends parentRouter{
    get routes(){
        return {
            '/fibonacci': 'dummyRoute'
        }
    }

    constructor(router){
        super(router)
    }

    dummyRoute(req,res,next){
        res.json(req.body.resultQueue)
    }

    microFibonacci(req,res){
        let number = req.query.num;
        return new Promise((resolve,reject)=>{
            conn.sendRPC('rpc_queue',number,(num)=>{
                req.body = req.body || {};
                req.body.resultQueue={
                    number:number,
                    fiboResult:num
                }
                resolve({
                    number:number,
                    fiboResult:num
                });
            });
        })
    }
}

module.exports = MathLibrery;
