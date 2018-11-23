const express = require("express");
const fetch = require('node-fetch');
const endpoints = require('../middleware/endpoints');
const {successResponse, serverErrorResponse, notFound} = require("../middleware/responses")

let policy = express.Router();

policy.get('/v1/policy/id/:id', (req, res) => {

    if (!req.params.id){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    fetch(endpoints.users)
    .then(response => {
        if (response.headers && response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") > -1)            
            return response.json();
        else return response;
    })
    .then(responseJson => {
        let clients = responseJson.clients;
        if (clients && Array.isArray(clients)){

            let client = null;

            clients.some(possibleClient => {
                if (possibleClient.id == req.params.id){
                    client = possibleClient;
                    return true;
                }
            })

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
    .catch(err => {
        console.log(err);
        serverErrorResponse(res, err);
        return;
    })
    
})

policy.get('/v1/user/name/:name', (req, res) => {

    if (!req.params.name){
        let message = {
            code: "API004",
            message: "Error",
            description: "Missing parameters"
        }
        serverErrorResponse(res, message);
        return;
    }

    fetch(endpoints.users)
    .then(response => {
        if (response.headers && response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") > -1)            
            return response.json();
        else return response;
    })
    .then(responseJson => {
        let clients = responseJson.clients;
        if (clients && Array.isArray(clients)){

            let client = null;

            clients.some(possibleClient => {
                if (possibleClient.name == req.params.name){
                    client = possibleClient;
                    return true;
                }
            })

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
    .catch(err => {
        console.log(err);
        serverErrorResponse(res, err);
        return;
    })
    
})

module.exports = policy;