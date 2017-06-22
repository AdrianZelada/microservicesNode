
let parentRouter=require('../core/parent.router');
let User= require('../schemas/users');
let conn= require('../communication/conn').default();

class Users extends parentRouter{

    get routes(){
        return{
            '/email' : 'sendEmail',
        }
    }

    constructor(router,db){
        super(router, User(db))
    }

    sendEmail(req,res){
        this.Model.find(function (err,resp) {
            if(err) this.handleError(res)(err);
            return res.json(resp);
        });
    }

    callbackEmail(req,res){
        return new Promise((resolve,reject)=>{
            conn.sendToQueue('email',req.feedbackData)
            resolve({send:'Send Email'})
        })
    }
}

module.exports = Users;