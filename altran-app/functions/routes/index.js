const express = require("express");
const fetch = require('node-fetch');
const endpoints = require('../config/endpoints');
const find = require('../middleware/index').find;
const hasAccess = require('../middleware/index').hasAccess;
const {successResponse, serverErrorResponse, notFound} = require("../middleware/responses")

let user = express.Router();

user.get('/v1/user/id/:id', hasAccess("user:read"), (req, res) => {

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

user.get('/v1/user/name/:name', hasAccess("user:read"), (req, res) => {

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

user.get('/v1/user/name/:name/policies', hasAccess("policy:read"), (req, res) => {

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
            return null;
        }

    })
    .then(policies => {
        if (policies){
            let message = {
                code: "S01",
                message: "Success",
                description: "Found"
            }
            successResponse(res, message, policies);
            return
        } else {
            let message = {
                code: "API005",
                message: "Error",
                description: "Not found"
            }
            notFound(res, message);
            return;
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

user.get('/v1/policy/:number/user', hasAccess("policy:read"), (req, res) => {

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
           return null;
        }

    })
    .then(client => {
        if (client){
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

module.exports = user;