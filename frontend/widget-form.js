let urlArr = window.location.href.split("/");
let id = Number(urlArr[urlArr.length - 1]);
const url = 'http://localhost:3000/widgets/' + id;

//POST

const addNewWidget = () => {
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

    const url = 'http://localhost:3000/widgets';

    const newWidget = {
        column,
        type,
        title,
        headerType,
        dataArray
    }

    postWidget(url, newWidget);
}

const postWidget = (url, widgetData) => {
    const http = new XMLHttpRequest();

    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirectToHomepage();
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
}

//GET one widget by id

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

//EDIT

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

//DELETE

const deleteWidget = () => {
    const http = new XMLHttpRequest();

    http.open('DELETE', url, true);

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirectToHomepage();
        }
    }

    http.send(null);
}

const checkIfEditOrAdd = () => {
    const formHeader = document.getElementById("form-header");
    const saveButton = document.getElementById("save-widget");

    if (id > 0) {
        console.log("im from edit");
        getWidget();
        formHeader.textContent = "Edit widget";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("field", "delete-widget");
        deleteButton.onclick = function () { deleteWidget() };
        const widgetForm = document.getElementById("widget-form");
        widgetForm.appendChild(deleteButton);
        saveButton.textContent = "Edit";
        saveButton.onclick = function () { editWidget() };
    } else {
        console.log("im from add");
        formHeader.textContent = "Add new widget";
        saveButton.textContent = "Add";
        saveButton.onclick = function () { addNewWidget() };
    }
}

window.onload = function () {
    checkIfEditOrAdd();
}


const redirectToHomepage = () => {
    location.href = 'http://localhost:3000/app/dashboard/';
}
