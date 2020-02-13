const addNewWidget = () => {
    const title = document.getElementById("title").value;
    const columnNum = parseInt(document.getElementById("column-number").value);
    const widgetType = parseInt(document.getElementById("widget-type").value);
    const headerType = parseInt(document.getElementById("header-type").value);
    const data = JSON.parse(document.getElementById("data").value);
    let dataArray = [];
    if (!(data instanceof Array)) {
        dataArray.push(data);
    } else {
        dataArray = data;
    }

    const url = "http://localhost:3000/widgets";

    const newWidget = {
        column: columnNum,
        type: widgetType,
        title,
        headerType,
        dataArray
    }

    postWidget(url, newWidget);
}

const postWidget = (url, widgetData) => {
    const http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(http.responseText.newWidgetId);
            location.href = "http://127.0.0.1:5500/frontend/dashboard.html";
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
}


