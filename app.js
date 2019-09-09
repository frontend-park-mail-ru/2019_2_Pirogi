const express = require('express');
const Logger = require('./static/js/libs/Logger');
const app = express();

__dirname += '/public';

const log = new Logger();
app.get('*', function (req, res) {
    res.sendFile(__dirname + req.url + '.html', (e) => {
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
