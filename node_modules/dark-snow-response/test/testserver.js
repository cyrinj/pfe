const express = require('express');
const bodyparser = require('body-parser');
const response = require('../index.js');


var app = express();
response.setProvider('tester');
response.setWarnings('default warnings');

app.use(bodyparser.urlencoded({extended:true}));

app.get('/json', (req, res) => {
    response.json(res, "testing json", "json warning");
});
app.get('/error', (req, res) => {
    response.error(res, "testing error");
});
app.get('/unauthorized', (req, res) => {
    response.unauthorized(res, "testing unauthorized");
});
app.get('/badRequest', (req, res) => {
    response.badRequest(res, "testing badRequest");
});
app.get('/created', (req, res) => {
    response.created(res, "testing created");
});
app.get('/accepted', (req, res) => {
    response.accepted(res, "testing accepted");
});

app.listen(9999);

console.log("app is running on port " + 9999);