(() => {
    const tableWidgetType = 0;
    const url = 'http://localhost:3000/widgets/filter/' + tableWidgetType;
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(http.responseText);
            data.filteredWidgets.forEach(widget => {
                createTable(widget);
            })
        }
    }
})();

const createTable = (widget) => {
    const widgetContainer = document.createElement('article');
    widgetContainer.classList.add('widget', 'table');
    const table = document.createElement('table');
    table.classList.add('table-data');
    if (widget.settings) {
        table.classList.add('table-with-settings')
        const tableSettings = document.createElement('div');
        tableSettings.onclick = function () { redirectToEditWidgetForm(widget.id) };
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
    tableHeader.onclick = function () { redirectToEditWidgetForm(widget.id) };
    tableHeader.title = 'Click to edit widget';
    widget.headerType ? tableHeader.classList.add('table-header', 'dark') : tableHeader.classList.add('table-header');
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
