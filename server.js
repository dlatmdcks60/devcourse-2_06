let http = require("http");
let url = require("url");

function start(route, handle) {
    function onRequest(req, res) {
        let pathName = url.parse(req.url).pathname;
        if (pathName === "/favicon.ico") return;
        let queryData = url.parse(req.url, true).query;


        route(pathName, handle, res, queryData.productId);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;