/**
 * Created by iZel on 6/9/17.
 */

class ParentRouter {

    get defaultRoute(){
        return {
            '/'         : 'getAll',
            'POST /'    : 'create',
            'PUT /'     : 'update',
            'DELETE /:id'  : 'remove'
        }
    }

    get routes(){
        return {}
    }

    constructor(router,Model=null){
        this.router=router;
        this.Model=Model;
        this.default={};
        if (!this.router) throw new Error('Missing app property');
        this.default = Model ? this.defaultRoute:{}
        this.registerRoutes();
    }

    registerRoutes() {
        let routes = Object.assign({},this.default,this.routes);

        Object.keys(routes).forEach((path) => {
            let method = routes[path];
            let verb = path.split(' ').length > 1 ? path.split(' ')[0] : 'get';
            verb = verb.toLowerCase();
            this.router[verb](path, this[method].bind(this));
        });
    }

    getAll(req,res) {
        this.Model.find(function (err,resp) {
            if(err) this.handleError(res)(err);
            return res.json(resp);
        });
    }

    create(req,res){
        let body= req.body;
        let model=new this.Model(body);
        model.save(function (err,data) {
            if(err) return this.handleError(res)(err);
            return res.json(data)
        })
    }

    update(req,res){
        let query = {
            _id:req.body._id
        };
        this.Model.findOneAndUpdate(query,req.body, {new:true},function (err, doc) {
            if (err) this.handleError(res)(err);
            res.json(doc);
        })
    }

    remove(req,res){
        this.Model.remove({_id:req.params.id},function (err,data) {
            if(err) return this.handleError(res)(err);
            return res.json(data)
        })
    }


    handleError(res) {
        return function(error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = ParentRouter;

