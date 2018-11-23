const express = require("express");
let helmet = require('helmet')
const {verify, hasAccess} = require("./middleware/index.js")
const port = 3005;

const routes = require('./routes') 

const app = express();
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(verify)
app.use(routes)

app.listen(port, () => console.log(`Altran app listening on port ${port}!`))