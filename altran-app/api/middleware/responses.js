exports.successResponse =  function(res, message, data){
    res.status(200).send({
        status: {
            message: message,
            statusCode: 200,
        },
        data
    });
    return;  
}

exports.notAuthenticated =  function(res, message){
    res.status(401).send({
        status: {
            message: message,
            statusCode: 401
        }
    });
    return;  
}

exports.notAuthorized =  function(res, message){
    res.status(403).send({
        status: {
            message: message,
            statusCode: 403
        }
    });
    return;  
}

exports.notFound =  function(res, message){
    res.status(404).send({
        status: {
            message: message,
            statusCode: 404
        }
    });
    return;  
}

exports.serverErrorResponse =  function(res, message){
    res.status(500).send({
        status: {
            message: message,
            statusCode: 500
        }
    });
    return;  
}