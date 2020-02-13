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

    res.json({
        allWidgets
    })
});

app.get("/widgets/:id", cors(corsOptions), (req, res) => {
    const id = Number(req.params.id);
    let widgetToEdit = allWidgets.find(widget => widget.id === id);

    res.json({
        widgetToEdit
    })
});

app.post("/widgets", cors(corsOptions), (req, res) => {
    const id = initialWidgets[initialWidgets.length - 1].id + 1;
    const column = req.body.column;
    const type = req.body.type;
    const title = req.body.title;
    const headerType = req.body.headerType;
    const data = req.body.dataArray;

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
        newWidgetId: id
    })

});

app.put("/widgets/:id", cors(corsOptions), (req, res) => {
    const id = Number(req.params.id);
    const column = req.body.column;
    const type = req.body.type;
    const title = req.body.title;
    const headerType = req.body.headerType;
    const data = req.body.dataArray;

    let indexOfWidget = allWidgets.findIndex(widget => widget.id === id);

    const editedWidget = {
        id,
        column,
        type,
        title,
        headerType,
        data
    }

    allWidgets[indexOfWidget] = editedWidget;

    res.json({
        editedId: id
    })
});

app.delete("/widgets/:id", cors(corsOptions), (req, res) => {
    const id = Number(req.params.id);

    allWidgets = allWidgets.filter(widget => widget.id !== id);

    res.status(200).send({});
});

app.listen(process.env.PORT || port, () => {
    console.log("Started listening");
});