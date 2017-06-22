/**
 * Created by iZel on 6/9/17.
 */


class Group {
    constructor(db){
        let Schema = db.mongoose.Schema;

        this.schema = new Schema({
            name:String,
            createdAt:Date,
            userCreated:{
                type:Schema.ObjectId,
                ref:'User'
            },
            members:[{
                type:Schema.ObjectId,
                ref:'User'
            }]
        })
    }
}

module.exports=(db)=>{
    return db.mongoose.model('Group',new Group(db).schema);
}