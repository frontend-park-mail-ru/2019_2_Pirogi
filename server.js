const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let {url} = req;
    if (/\/$/.test(url)){
        url = '/index.html' + url;
    }
    let body;

    try {
        body = fs.readFileSync(`./public${url}`);
        res.write(body);
    }
    catch (e) {
        res.statusCode = 404;
    }
    res.end();
});

server.listen(3000);