/**
 * Created by iZel on 6/9/17.
 */


class User {
    constructor(db){
        let Schema = db.mongoose.Schema;

        this.schema = new Schema({
            name: String,
            category:String,
            groupsCreate:[{
                type:Schema.ObjectId,
                ref:'Group'
            }],
            groups: [{
                type:Schema.ObjectId,
                ref:'Group'
            }]
        });
    }
}

module.exports=(db)=>{
    return db.mongoose.model('User',new User(db).schema);
};