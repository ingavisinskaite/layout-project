(() => {
    const WidgetType = {
        TABLE: 0,
        CHAT: 1
    }
    const url = 'http://localhost:3000/widgets/filter/' + WidgetType.TABLE;
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.send();

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                let data = JSON.parse(http.responseText);
                data.filteredWidgets.forEach(widget => {
                    createTable(widget);
                })
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
})();

const createTable = (widget) => {
    const widgetContainer = document.createElement('article');
    widgetContainer.classList.add('widget', 'table');
    const table = document.createElement('table');
    table.classList.add('table-data');
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add("edit-delete-icons-container");
    const editIcon = document.createElement('img');
    editIcon.classList.add("edit-icon");
    editIcon.src = 'pencil.svg';
    editIcon.onclick = () => redirectToWidgetForm(widget.id);
    iconsContainer.appendChild(editIcon);
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'delete.svg';
    deleteIcon.onclick = () => deleteWidget(widget.id);
    deleteIcon.classList.add('delete-icon');
    iconsContainer.appendChild(deleteIcon);
    widgetContainer.appendChild(iconsContainer);
    if (widget.settings) {
        table.classList.add('table-with-settings')
        const tableSettings = document.createElement('div');
        tableSettings.onclick = () => redirectToWidgetForm(widget.id);
        tableSettings.title = 'Click to edit widget';
        tableSettings.classList.add('settings');
        const tableType = document.createElement('p');
        tableType.textContent = 'Dashboard: ' + widget.title;
        tableSettings.appendChild(tableType);
        const settingsIcon = document.createElement('div');
        settingsIcon.classList.add('settings-icon', 'arrow-bottom');
        tableSettings.appendChild(settingsIcon);
        widgetContainer.appendChild(tableSettings);
    }
    const tableHeader = document.createElement('tr');
    tableHeader.onclick = () => redirectToWidgetForm(widget.id);
    tableHeader.title = 'Click to edit widget';
    if (widget.headerType === HeaderType.DARK) {
        tableHeader.classList.add('table-header', 'dark');
    } else {
        tableHeader.classList.add('table-header');
    }
    const tableHeaderData = ['#', 'First Name', 'Last Name', 'Username'];
    tableHeaderData.forEach(data => {
        const tableHeaderCol = document.createElement('th');
        tableHeaderCol.textContent = data;
        tableHeader.appendChild(tableHeaderCol);
    })
    table.appendChild(tableHeader);
    widget.data.forEach(rowData => {
        const tableRow = document.createElement('tr');
        const tableRowId = document.createElement('td');
        tableRowId.textContent = rowData.id;
        tableRow.appendChild(tableRowId);
        const tableRowFirstName = document.createElement('td');
        tableRowFirstName.textContent = rowData.firstName;
        tableRow.appendChild(tableRowFirstName);
        const tableRowLastName = document.createElement('td');
        tableRowLastName.textContent = rowData.lastName;
        tableRow.appendChild(tableRowLastName);
        const tableRowUsername = document.createElement('td');
        tableRowUsername.textContent = rowData.userName;
        tableRow.appendChild(tableRowUsername);
        table.appendChild(tableRow);
    })
    widgetContainer.appendChild(table);
    if (widget.column === 3) {
        const column = document.getElementById('column3-widgets');
        column.appendChild(widgetContainer);
    } else {
        const column = document.getElementById('column' + widget.column);
        column.appendChild(widgetContainer);
    }
}

const deleteWidget = (id) => {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:3000/widgets/' + id;

    http.open('DELETE', url, true);

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                location.reload();
            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    http.send(null);
}

const redirectToWidgetForm = (id) => {
    location.href = 'http://localhost:3000/app/widget-form/' + id;
}

const redirectToHomepage = () => {
    location.href = 'http://localhost:3000/app/dashboard/';
}

const HeaderType = {
    LIGHT: 0,
    DARK: 1
}