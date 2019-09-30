//import Logger from "./src/js/libs/logger.js";

const express = require('express');
const Logger = require('./src/js/libs/logger');
const app = express();

const log = new Logger();
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html', () => {
        // if (e) {
        //     log.logError(404, req.url);
        //     return res.sendFile(__dirname + '/src/pages/error/error.html');
        // }
    }
    );
});

app.get(/^\/[A-Za-z0-9]+$/, function(req, res) {
    res.sendFile(__dirname + `/src/pages/${req.url}/${req.url}.html`, () => {
        // if (e) {
        //     log.logError(404, req.url);
        //     return res.sendFile(__dirname + '/src/pages/error/error.html');
        // }
    }
    );
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + req.url, (e) => {
        if (e) {
            log.logError(404, req.url);
            return res.sendFile(__dirname + '/src/pages/error/error.html');
        }
    }
    );
});

app.listen(81);

app.use((err, req, res) => {
    log.logError(500, err);
    return res.status(500).send(err);
});
