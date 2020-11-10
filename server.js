// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function formatUTC(data) {

    const date = new Date(data) 
    const utcString = date.toUTCString()

    return `${utcString}`
}

// your time API endpoint... 
app.get("/api/timestamp/:code", async function (req, res) {

    const code = Number(req.params.code)
    
    const rawUtc = await isNaN(code) ? formatUTC(req.params.code) : formatUTC(code)
    const unix = await isNaN(code) ? new Date(req.params.code).getTime() : new Date(code).getTime()

    
    console.log(rawUtc)

    if(!unix) {
       res.json({"error": "Invalid Date"})
    } else {
     res.json({"unix": unix, "utc" : rawUtc});
    }
  
});


// your time API endpoint... 
app.get("/api/timestamp/", async function (req, res) {

    res.json({"unix": new Date().getTime(), "utc" : formatUTC(new Date())});

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});