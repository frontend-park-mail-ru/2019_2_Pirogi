const express = require('express');
const logger = require('./static/js/libs/Logger');
const app = express();

const log = new logger();
app.use(express.static('public/'));

app.get('/', function (req, res) {
    app.sendFile('index.html')
});

app.listen(80);

app.use(function (req, res, next) {
    log.addError(404, req.url);
    return res.status(404).send('Route ' + req.url + ' not found.');
});

app.use(function (err, req, res, next) {
    log.addError(500, err);
    return res.status(500).send(err);
});