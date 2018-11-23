const express = require("express");
const fetch = require('node-fetch');
const endpoints = require('../middleware/endpoints');
const {successResponse, serverErrorResponse, notFound} = require("../middleware/responses")

let user = express.Router();

function find(fetch, endpoint, root, logic, filter = false){
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

user.get('/v1/user/id/:id', (req, res) => {

    if (!req.params.id){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    let logic = possibleClient => {
        if (possibleClient.id == req.params.id){
            return possibleClient;
        }
    };

    find(fetch, endpoints.users, "clients", logic)
    .then(client => {

        if (client != null){
            let message = {
                code: "S01",
                message: "Success",
                description: "Found"
            }
            successResponse(res, message, client);
            return
        } else {
            let message = {
                code: "API005",
                message: "Error",
                description: "Not found"
            }
            notFound(res, message);
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
    
})

user.get('/v1/user/name/:name', (req, res) => {

    if (!req.params.name){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    let logic = possibleClient => {
        if (possibleClient.name == req.params.name){
            return possibleClient;
        }
    };

    find(fetch, endpoints.users, "clients", logic)
    .then(client => {

        if (client != null){
            let message = {
                code: "S01",
                message: "Success",
                description: "Found"
            }
            successResponse(res, message, client);
            return
        } else {
            let message = {
                code: "API005",
                message: "Error",
                description: "Not found"
            }
            notFound(res, message);
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
    
})

user.get('/v1/user/name/:name/policies', (req, res) => {

    if (!req.params.name){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    let logic = possibleClient => {
        if (possibleClient.name == req.params.name){
            return possibleClient;
        }
    };

    find(fetch, endpoints.users, "clients", logic)
    .then(client => {

        if (client != null){

            let policyLogic = possiblePolicy => {
                if (possiblePolicy.clientId == client.id)
                    return possiblePolicy;
            };

            return find(fetch, endpoints.policies, "policies", policyLogic, true);
           
        } else {
            let message = {
                code: "API005",
                message: "Error",
                description: "Not found"
            }
            notFound(res, message);
            return
        }

    })
    .then(policies => {
        let message = {
            code: "S01",
            message: "Success",
            description: "Found"
        }
        successResponse(res, message, policies);
        return
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

})

user.get('/v1/policy/:number/user', (req, res) => {

    if (!req.params.number){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    let logic = possiblePolicy => {
        if (possiblePolicy.id == req.params.number){
            return possiblePolicy;
        }
    };

    find(fetch, endpoints.policies, "policies", logic)
    .then(policy => {

        if (policy != null){

            let clientLogic = possibleClient => {
                if (possibleClient.id == policy.clientId)
                    return possibleClient;
            };

            return find(fetch, endpoints.users, "clients", clientLogic);
           
        } else {
            let message = {
                code: "API005",
                message: "Error",
                description: "Not found"
            }
            notFound(res, message);
            return
        }

    })
    .then(client => {
        let message = {
            code: "S01",
            message: "Success",
            description: "Found"
        }
        successResponse(res, message, client);
        return
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

})

module.exports = user;