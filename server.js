const http = require('http');
const fs = require('fs');
const Logger = require('./static/js/libs/Logger');
const basePath = '/public/';

let log = new Logger();
const server = http.createServer((req, res) => {
    let {url} = req;
    if (/\/$/.test(url)) {
        url = 'index.html';
    }
    try {
        const body = fs.readFileSync(`.${basePath}${url}`);
        res.write(body);
    } catch (e) {
        log.addError(e);
        res.statusCode = 404;
    }
    res.end();
});

server.listen(80);