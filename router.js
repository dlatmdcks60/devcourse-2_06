function route(pathName, handle, res, productId) {
    console.log('pathname: ' + pathName);

    if (typeof handle[pathName] == "function") {
        handle[pathName](res, productId);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write("Not Found");
        res.end();
    }
}

exports.route = route;