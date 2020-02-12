const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const initialWidgets = require("./initial-widgets");

let allWidgets = initialWidgets;

app.use(bodyParser.json());

const allowedOrigins = ["http://127.0.0.1:5500"];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

const port = 3000;

app.options("*", cors(corsOptions));


app.get("/widgets", cors(corsOptions), (req, res) => {

    console.log("im from the GhETto");
    res.json({
        allWidgets
    })
});

app.post("/widgets", cors(corsOptions), (req, res) => {
    console.log(req.body.data);
    const id = initialWidgets[initialWidgets.length - 1].id + 1;
    const column = req.body.column;
    const type = req.body.type;
    const title = req.body.title;
    const headerType = req.body.headerType;
    const data = [{ id: 0, author: "a", message: "aac" }]

    const newWidget = {
        id,
        column,
        type,
        title,
        headerType,
        data
    }

    allWidgets.push(newWidget);

    res.json({
        allWidgets
    })

});

app.put("/widgets/:id", cors(corsOptions), (req, res) => { });

app.delete("/widgets/:id", cors(corsOptions), (req, res) => { });

app.listen(process.env.PORT || port, () => {
    console.log("Started listening");
});