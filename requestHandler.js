const fs = require("fs");
const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderlist.html");


const mariadb = require("./database/connect/mariadb.js")

function main(res) {
    console.log("main")

    mariadb.query("SELECT * FROM product;", (err, rows) => {
        console.log(rows)
    });

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write(main_view);
    res.end();
}

function login(res) {
    console.log("login")

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write("Login Page");
    res.end();
}

function redRacket(res) {
    fs.readFile("./img/redRacket.png", (err, data) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(data);
        res.end();
    });
}

function blueRacket(res) {
    fs.readFile("./img/blueRacket.png", (err, data) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(data);
        res.end();
    });
}

function blackRacket(res) {
    fs.readFile("./img/blackRacket.png", (err, data) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(data);
        res.end();
    });
}

function order(res, productId) {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });
    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", (err, rows) => {
        console.log(rows)
    });
    res.write("Order Page");
    res.end();
}

function orderlist(res) {
    console.log("orderlist")

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    mariadb.query("SELECT * FROM orderlist;", (err, rows) => {
        res.write(orderlist_view);

        rows.forEach(element => {
            res.write("<tr>" +
                "<td>" + element.product_id + "</td>" +
                "<td>" + element.order_date + "</td>" +
                "</tr>");
        });

        res.write("</table>");
        res.end();
    });

}

let handle = {};
handle['/'] = main;
handle['/login'] = login;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;