
let parentRouter=require('../core/parent.router')
let Group= require('../schemas/group')
let conn= require('../communication/conn').default();

class Groups extends parentRouter{

    get routes(){
        return{
        }
    }

    constructor(router,db){
        super(router,Group(db))
    }

    callbackList(req,res){
        return new Promise((resolve,reject)=>{
            resolve({length:req.feedbackData.length})
        })
    }
}

module.exports = Groups;