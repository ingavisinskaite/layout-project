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
    const iconsContainer = createIconsContainer(widget.id);
    widgetContainer.appendChild(iconsContainer);
    if (widget.settings) {
        table.classList.add('table-with-settings')
        const tableSettings = createSettingsHeader(widget.headerType, widget.id, 'Dashboard: ' + widget.title);
        widgetContainer.appendChild(tableSettings);
    }
    const tableHeader = createTableHeader(widget.id, widget.headerType);
    table.appendChild(tableHeader);
    createTableRows(widget.data, table);
    widgetContainer.appendChild(table);
    if (widget.column === 3) {
        const column = document.getElementById('column3-widgets');
        column.appendChild(widgetContainer);
    } else {
        const column = document.getElementById('column' + widget.column);
        column.appendChild(widgetContainer);
    }
}

const createIconsContainer = (widgetId) => {
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add("edit-delete-icons-container");
    const editIcon = createIcon('edit', 'pencil.svg', redirectToWidgetForm, widgetId);
    iconsContainer.appendChild(editIcon);
    const deleteIcon = createIcon('delete', 'delete.svg', deleteWidget, widgetId);
    iconsContainer.appendChild(deleteIcon);
    return iconsContainer;
}

const createIcon = (type, imgSrc, action, parameter) => {
    const icon = document.createElement('img');
    icon.classList.add(type + '-icon');
    icon.src = imgSrc;
    icon.onclick = () => action(parameter);
    return icon;
}

const createSettingsIcon = () => {
    const settingsIcon = document.createElement('div');
    settingsIcon.classList.add('settings-icon', 'arrow-bottom');
    return settingsIcon;
}

const createSettingsHeader = (headerType, widgetId, widgetHeader) => {
    const settingsHeader = document.createElement('div');
    settingsHeader.classList.add('settings');
    if (headerType === HeaderType.DARK) {
        settingsHeader.classList.add('dark');
    }
    settingsHeader.onclick = () => redirectToWidgetForm(widgetId);
    settingsHeader.title = 'Click to edit widget';
    const settingsHeaderText = document.createElement('p');
    settingsHeaderText.textContent = widgetHeader;
    settingsHeader.appendChild(settingsHeaderText);
    const settingsIcon = createSettingsIcon();
    settingsHeader.appendChild(settingsIcon);
    return settingsHeader;
}

const createTableHeader = (widgetId, headerType) => {
    const tableHeader = document.createElement('tr');
    tableHeader.onclick = () => redirectToWidgetForm(widgetId);
    tableHeader.title = 'Click to edit widget';
    if (headerType === HeaderType.DARK) {
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
    return tableHeader;
}

const createTableRows = (data, table) => {
    data.forEach(rowData => {
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