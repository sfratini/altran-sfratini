const express = require("express");
let helmet = require('helmet')
const {verify} = require("./middleware/index.js")

const routes = require('./routes') 

const app = express();
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(verify)
app.use(routes)

module.exports = app;