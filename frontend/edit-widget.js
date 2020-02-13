const urlParams = new URLSearchParams(window.location.search);
const widgetId = urlParams.get('id');
const url = 'http://localhost:3000/widgets/' + widgetId;

const getWidget = () => {
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const widgetData = JSON.parse(http.responseText);
            fillEditForm(widgetData.widgetToEdit);
        }
    }
}

const fillEditForm = (widget) => {
    const title = document.getElementById('title')
    title.value = widget.title;
    const column = document.getElementById('column-number');
    column.value = widget.column;
    const type = document.getElementById('type');
    type.value = widget.type;
    const headerType = document.getElementById('header-type');
    headerType.value = widget.headerType;
    const data = document.getElementById('data');
    data.value = JSON.stringify(widget.data);
}

window.onload = getWidget();

const editWidget = () => {
    const title = document.getElementById('title').value;
    const column = parseInt(document.getElementById('column-number').value);
    const type = parseInt(document.getElementById('type').value);
    const headerType = parseInt(document.getElementById('header-type').value);
    const data = JSON.parse(document.getElementById('data').value);
    let dataArray = [];
    if (!(data instanceof Array)) {
        dataArray.push(data);
    } else {
        dataArray = data;
    }


    const editedWidget = {
        column,
        type,
        title,
        headerType,
        dataArray
    }

    putWidget(editedWidget);
}

const putWidget = (widgetData) => {
    const http = new XMLHttpRequest();

    http.open('PUT', url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirectToHomepage();
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
}

const deleteWidget = () => {
    const http = new XMLHttpRequest();

    http.open('DELETE', url, true);

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(http.responseText);
            redirectToHomepage();
        }
    }

    http.send(null);
}

const redirectToHomepage = () => {
    location.href = 'http://localhost:3000/dashboard/';
}

