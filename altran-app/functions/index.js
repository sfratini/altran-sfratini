const express = require("express");
var helmet = require('helmet')
const {verify, hasAccess} = require("./middleware/index.js")
const port = 3005;
/*
var serviceAccount = require("./nsx-backend-dev-firebase-adminsdk-cvobn-0458db0e7c.json");
let config = functions.config().firebase || {};
config.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(config);

const settings = { timestampsInSnapshots: true};  
admin.firestore().settings(settings);
*/

const policyRoutes = require('./policy') 
const userRoutes = require('./user') 

const app = express();
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(verify)
app.use(userRoutes)
app.use(policyRoutes)

app.listen(port, () => console.log(`Altran app listening on port ${port}!`))