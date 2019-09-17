const express = require('express');
const Logger = require('./static/js/libs/Logger');
const app = express();

const log = new Logger();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/pages/index/index.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/film', function (req, res) {
    res.sendFile(__dirname + '/src/pages/film/film.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/src/pages/search/search.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/error', function (req, res) {
    res.sendFile(__dirname + '/src/pages/error/error.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/entrance', function (req, res) {
    res.sendFile(__dirname + '/src/pages/entrance/entrance.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/src/pages/admin/admin.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('/profile', function (req, res) {
    res.sendFile(__dirname + '/src/pages/profile/profile.html', (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + req.url, (e) => {
            if (e) {
                log.logError(404, req.url);
                return res.status(404).send('Route ' + req.url + ' is not found.');
            }
        }
    );
});

app.listen(80);


app.use((err, req, res) => {
    log.logError(500, err);
    return res.status(500).send(err);
});

