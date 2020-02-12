const addNewWidget = () => {
    const title = document.getElementById("title").value;
    const columnNum = document.getElementById("column-number").value;
    const widgetType = document.getElementById("widget-type").value;
    const headerType = document.getElementById("header-type").value;
    const data = document.getElementById("data").value;

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
    const Http = new XMLHttpRequest();

    Http.open("POST", url, true);

    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.responseText)
        }
    }

    Http.send(JSON.stringify("hi"));
}


