const addNewWidget = () => {
    const title = document.getElementById("title").value;
    const columnNum = document.getElementById("column-number").value;
    const widgetType = document.getElementById("widget-type").value;
    const headerType = document.getElementById("header-type").value;
    const data = JSON.stringify(document.getElementById("data").value);

    const url = "http://localhost:3000/widgets";

    const newWidget = {
        column: columnNum,
        type: widgetType,
        title,
        headerType,
        data
    }

    console.log(newWidget);
    const sendBtn = document.getElementById("save-btn");
    sendBtn.addEventListener("click", postWidget(url, newWidget));
}

const postWidget = (url, widgetData) => {
    const http = new XMLHttpRequest();

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(http.responseText)
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
    //location.href = "http://127.0.0.1:5500/frontend/dashboard.html";
}


