const urlArr = window.location.href.split('widget-form');
const paramsArr = urlArr[urlArr.length - 1].split('/');
const id = paramsArr[paramsArr.length - 1];

//POST

const addNewWidget = (url) => {
    const formValues = getFormValues();
    const data = JSON.parse(formValues.data);
    let dataArray = [];
    if (!(data instanceof Array)) {
        dataArray.push(data);
    } else {
        dataArray = data;
    }

    const newWidget = {
        column: parseInt(formValues.column),
        type: parseInt(formValues.type),
        title: formValues.title,
        headerType: parseInt(formValues.headerType),
        dataArray
    }

    postWidget(url, newWidget)
}

const postWidget = (url, widgetData) => {
    const http = new XMLHttpRequest();

    http.open('POST', url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                redirectToHomepage();
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
}

//GET one widget by id

const getWidget = (url) => {
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.send();

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                const widgetData = JSON.parse(http.responseText);
                fillEditForm(widgetData.widgetToEdit);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}

const fillEditForm = (widget) => {
    const formFields = getFormFields();
    formFields.titleInput.value = widget.title;
    formFields.columnInput.value = widget.column;
    formFields.typeSelect.value = widget.type;
    formFields.headerTypeSelect.value = widget.headerType;
    formFields.dataInput.value = JSON.stringify(widget.data);
}

//EDIT

const editWidget = (url) => {
    const formValues = getFormValues();
    const data = JSON.parse(formValues.data);
    let dataArray = [];
    if (!(data instanceof Array)) {
        dataArray.push(data);
    } else {
        dataArray = data;
    }

    const editedWidget = {
        column: parseInt(formValues.column),
        type: parseInt(formValues.type),
        title: formValues.title,
        headerType: parseInt(formValues.headerType),
        dataArray
    }

    putWidget(url, editedWidget);
}

const putWidget = (url, widgetData) => {
    const http = new XMLHttpRequest();

    http.open('PUT', url, true);
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                redirectToHomepage();
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
    widgetData = JSON.stringify(widgetData);

    http.send(widgetData);
}

//DELETE

const deleteWidget = (url) => {
    const http = new XMLHttpRequest();

    http.open('DELETE', url, true);

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                redirectToHomepage();
            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    http.send(null);
}

const checkIfEditOrAdd = () => {
    const formHeader = document.getElementById('form-header');
    const saveButton = document.getElementById('save-widget');
    const baseAPIUrl = 'http://localhost:3000/widgets/';

    if (id !== "") {
        getWidget(baseAPIUrl + id);
        formHeader.textContent = 'Edit widget';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('field', 'delete-widget');
        deleteButton.onclick = () => deleteWidget(baseAPIUrl + id);
        const widgetForm = document.getElementById('widget-form');
        widgetForm.appendChild(deleteButton);
        saveButton.textContent = 'EDIT';
        saveButton.onclick = () => editWidget(baseAPIUrl + id);

    } else {
        formHeader.textContent = 'Add new widget';
        saveButton.textContent = 'ADD';
        saveButton.onclick = () => addNewWidget(baseAPIUrl);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkIfEditOrAdd();
}, false);

const redirectToHomepage = () => {
    window.location.replace(document.referrer);
}

const getFormFields = () => {
    return {
        titleInput: document.getElementById('title'),
        columnInput: document.getElementById('column-number'),
        typeSelect: document.getElementById('type'),
        headerTypeSelect: document.getElementById('header-type'),
        dataInput: document.getElementById('data')
    }
}

const getFormValues = () => {
    const formFields = getFormFields();
    return {
        title: formFields.titleInput.value,
        column: formFields.columnInput.value,
        type: formFields.typeSelect.value,
        headerType: formFields.headerTypeSelect.value,
        data: formFields.dataInput.value
    }
}

