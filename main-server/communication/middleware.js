/**
 * Created by iZel on 6/18/17.
 */
class Middleware{
    static middlewareBefore(config){
        return function (req,res,next) {
            let path= req.originalUrl.split('?')[0];
            let method = req.method.toLowerCase();
            if(config[path]){
                if (config[path].method == method) {
                    config[path].model[config[path].fn](req,res,next).then(()=>{
                        next();
                    })
                }else {
                    next();
                }
            }else {
                next();
            }
        }
    }

    static middlewareAfter(config){
        return function (req,res,next) {
            let oldRes = res.json;
            res.json = function (data) {
                let path = req.originalUrl.split('?')[0];
                let method = req.method.toLowerCase();
                if (config[path]) {
                    if (config[path].method == method) {
                        req.feedbackData=arguments[0];
                        config[path].model[config[path].fn](req, res, next).then((resolve) => {
                            let data={
                                data:arguments[0],
                                feedback:resolve
                            };
                            oldRes.call(res, data)
                        }).catch((e) => {
                            res.send('error')
                        })
                    } else {
                        oldRes.apply(res, arguments);
                    }
                } else {
                    oldRes.apply(res, arguments);
                }
            };
            next();
        }
    }
}

module.exports=Middleware;