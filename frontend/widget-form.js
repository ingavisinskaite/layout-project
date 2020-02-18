const urlArr = window.location.href.split('widget-form');
const paramsArr = urlArr[urlArr.length - 1].split('/');
const id = paramsArr[paramsArr.length - 1] || null;

const checkIfEditOrAdd = () => {
    const formHeader = document.getElementById('form-header');
    const saveButton = document.getElementById('save-widget');
    const BASE_API_URL = 'http://localhost:3000/widgets/';
    if (id) {
        getWidget(BASE_API_URL + id);
        formHeader.textContent = 'Edit widget';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.classList.add('field', 'delete-widget');
        deleteButton.onclick = () => deleteWidget(BASE_API_URL + id);
        const widgetForm = document.getElementById('widget-form');
        widgetForm.appendChild(deleteButton);
        saveButton.textContent = 'EDIT';
        saveButton.onclick = () => saveWidget(BASE_API_URL + id, 'PUT');

    } else {
        formHeader.textContent = 'Add new widget';
        saveButton.textContent = 'ADD';
        saveButton.onclick = () => saveWidget(BASE_API_URL, 'POST');
    }
}

const formatWidgetData = () => {
    const formValues = getFormValues();
    const data = formValues.data;
    let dataArray = [];
    if (!(data instanceof Array)) {
        dataArray.push(data);
    } else {
        dataArray = data;
    }
    const widgetData = {
        column: formValues.column,
        type: formValues.type,
        title: formValues.title,
        headerType: formValues.headerType,
        dataArray
    }
    return widgetData;
}

const saveWidget = (url, reqType) => {
    const widgetData = JSON.stringify(formatWidgetData());
    const http = new XMLHttpRequest();
    http.open(reqType, url, true);
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
    http.send(widgetData);
}

const getWidget = (url) => {
    const http = new XMLHttpRequest();
    http.open('GET', url);
    http.send();
    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                const widgetData = JSON.parse(http.responseText);
                fillWidgetForm(widgetData.widget);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}

const fillWidgetForm = (widget) => {
    const formFields = getFormFields();
    formFields.titleInput.value = widget.title;
    formFields.columnInput.value = widget.column;
    formFields.typeSelect.value = widget.type;
    formFields.headerTypeSelect.value = widget.headerType;
    formFields.dataInput.value = JSON.stringify(widget.data);
}

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
        column: parseInt(formFields.columnInput.value),
        type: parseInt(formFields.typeSelect.value),
        headerType: parseInt(formFields.headerTypeSelect.value),
        data: JSON.parse(formFields.dataInput.value)
    }
}
