/**
 * Created by iZel on 6/9/17.
 */

class Videos {
    constructor(db){
        let Schema = db.mongoose.Schema;
        this.schema = new Schema({
            name:String,
            category : String
        })
    }
}

module.exports=(db)=>{
    return db.mongoose.model('Videos',new Videos(db).schema);
}