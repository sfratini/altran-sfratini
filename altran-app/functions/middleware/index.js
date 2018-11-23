const {notAuthenticated, notAuthorized} = require('./responses')

exports.verify = function (req, res, next) {
    if (req && req.header("x-user") && req.header("x-user").length > 0){
        next()
        return
    } else {
        let message = {
            code: 'API001',
            message: 'Error',
            description: "Missing user header"
        };
        notAuthenticated(res, message)
        return;
    }
  }
  

exports.hasAccess = function (req, res, next) {
if (req && req.header("x-user") && req.header("x-user").length > 0){
    next()
    return
} else {
    let message = {
        code: 'API002',
        message: 'Error',
        description: "Not authorized"
    };
    notAuthorized(res, message)
    return;
}
}
  