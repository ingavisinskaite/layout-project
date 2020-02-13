window.onload = function () {
    const getInitialWidgets = () => {
        const url = 'http://localhost:3000/widgets';
        const http = new XMLHttpRequest();

        http.open('GET', url);
        http.send();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(http.responseText);
                data.allWidgets.forEach(widget => {
                    createWidget(widget)
                })
            }
        }
    }

    const createWidget = (widget) => {
        const widgetContainer = document.createElement('article');
        widgetContainer.classList.add('widget')
        if (!widget.type) {
            createTable(widget, widgetContainer);
        } else {
            createChat(widget, widgetContainer)
        }

        if (widget.column === 3) {
            const column = document.getElementById('column3-widgets');
            column.appendChild(widgetContainer);
        } else {
            const column = document.getElementById('column' + widget.column);
            column.appendChild(widgetContainer);
        }
    }

    const createTable = (widget, widgetContainer) => {
        widgetContainer.classList.add('table');
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
        return widgetContainer;
    }

    const createChat = (widget, widgetContainer) => {
        widgetContainer.classList.add('chat');
        const chatSettings = document.createElement('div');
        chatSettings.classList.add('settings');
        if (widget.headerType) {
            chatSettings.classList.add('dark');
        }
        chatSettings.onclick = function () { redirectToEditWidgetForm(widget.id) };
        chatSettings.title = 'Click to edit widget';
        const chatType = document.createElement('p');
        chatType.textContent = 'Conversation: ' + widget.title;
        chatSettings.appendChild(chatType);
        const settingsIcon = document.createElement('div');
        settingsIcon.classList.add('settings-icon', 'arrow-bottom');
        chatSettings.appendChild(settingsIcon);
        widgetContainer.appendChild(chatSettings);
        const messages = document.createElement('div');
        messages.classList.add('messages');
        widget.data.forEach(message => {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message');
            if (message.isMine) {
                messageContainer.classList.add('mine');
            }
            const personImgContainer = document.createElement('figure');
            personImgContainer.classList.add('person');
            message.isMine ? personImgContainer.classList.add('right') : personImgContainer.classList.add('left');
            const personImg = document.createElement('img');
            personImg.classList.add('person-img');
            personImg.src = message.img;
            personImgContainer.appendChild(personImg);
            messageContainer.appendChild(personImgContainer);
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble', 'triangle')
            message.isMine ? messageBubble.classList.add('right') : messageBubble.classList.add('left');
            const person = document.createElement('p');
            person.textContent = message.author;
            messageBubble.appendChild(person);
            const messageText = document.createElement('p');
            messageText.textContent = message.message
            messageBubble.appendChild(messageText);
            messageContainer.appendChild(messageBubble);
            messages.appendChild(messageContainer);
        });
        const newMessageInput = document.createElement('input');
        newMessageInput.type = 'text';
        newMessageInput.placeholder = 'Type and press enter';
        newMessageInput.classList.add('new-message');
        const sendBtn = document.createElement('button');
        sendBtn.classList.add('send-btn');
        sendBtn.textContent = 'Send';
        const sendIcon = document.createElement('img');
        sendIcon.src = 'send.svg';
        sendIcon.classList.add('send-icon');
        sendBtn.appendChild(sendIcon);
        widgetContainer.appendChild(messages);
        widgetContainer.appendChild(newMessageInput);
        widgetContainer.appendChild(sendBtn);
        return widgetContainer;
    }

    getInitialWidgets();

}

const redirectToAddWidgetForm = () => {
    location.href = 'http://localhost:3000/form/';
}

const redirectToEditWidgetForm = (id) => {
    location.href = 'http://localhost:3000/form/' + id;
}

const toggleMobileMenu = () => {
    const mobileMenuContainer = document.getElementsByClassName('mobile-menu-container')[0];
    mobileMenuContainer.classList.toggle('change');
}
