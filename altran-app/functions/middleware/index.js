const {notAuthenticated, notAuthorized} = require('./responses');
const RBAC = require('../roles/RBAC');
const roles = require('../roles/roles');
const fetch = require('node-fetch');
const endpoints = require('../config/endpoints');
const authenticator = new RBAC(roles);

function find (fetch, endpoint, root, logic, filter = false){
    return new Promise((resolve, reject) => {
        fetch(endpoint)
        .then(response => {
            if (response.headers && response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") > -1)            
                return response.json();
            else return response;
        })
        .then(responseJson => {
            let array = responseJson[root];
            if (array && Array.isArray(array)){
                if (filter)
                    resolve(array.filter(logic));
                else 
                    resolve(array.find(logic));
            } else {
                reject(null);
            }
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.find = find;

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
  

exports.hasAccess = operation => function (req, res, next) {
    
    let user  = req.header("x-user");

    let logic = possibleClient => {
        if (possibleClient.name == user){
            return possibleClient;
        }
    };

    find(fetch, endpoints.users, "clients", logic)
    .then(client => {

        if (client != null && authenticator.can(client.role, operation)){
            next();
        } else {
            let message = {
                code: "API006",
                message: "Error",
                description: "Not authorized"
            }
            notAuthorized(res, message);
            return
        }

    })
    .catch(err => {

        if (err){
            serverErrorResponse(res, err);
            return;
        } else {
            let message = {
                code: "API003",
                message: "Error",
                description: "Wrong response"
            }
            serverErrorResponse(res, message);
            return;
        }

    })

}
  