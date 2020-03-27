const fs = require('fs');
let env = JSON.parse(fs.readFileSync('./.env.json'));
Object.keys(env).forEach(key => process.env[key] = env[key]);

const express = require('express')
const app = express()
var path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const response = require('ybha-response');
const databaseUrl = process.env.DATABASE_URL;
const port = process.env.PORT;
const MongoClient = require('mongodb').MongoClient;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('rsc'))



response.setProvider("wantotrip")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

http = require('http')
var server = http.createServer(app);

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("X-Frame-Options", "ALLOW-FROM https://www.google.com https://www.youtube.com"); // restrict it to the required domain
    res.header("Access-Control-Allow-Origin", "*", 'http://kikosdev.com'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,X-Frame-Options');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// replace the uri string with your connection string.

mongoose.Promise = global.Promise

mongoose.connect(databaseUrl, {useMongoClient: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    console.log(err.reason);
    process.exit();
});

app.get('/', function(req, res){
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
        if(error){
            console.log(error);
            res.end(error);
        }
    });
  });

const v1Router = require('./router/v1/v1.router.js')
app.use('/api', v1Router)

server.listen(port, '0.0.0.0', () => {
    console.log(' listing to port :' + port)
})