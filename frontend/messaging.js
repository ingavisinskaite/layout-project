(() => {
    const WidgetType = {
        TABLE: 0,
        CHAT: 1
    }
    const url = 'http://localhost:3000/widgets/filter/' + WidgetType.CHAT;
    const http = new XMLHttpRequest();

    http.open('GET', url);
    http.send();

    http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                let data = JSON.parse(http.responseText);
                data.filteredWidgets.forEach(widget => {
                    createChat(widget);
                })
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
})();

const createChat = (widget) => {
    const widgetContainer = document.createElement('article');
    widgetContainer.classList.add('widget', 'chat');
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
    const chatSettings = document.createElement('div');
    chatSettings.classList.add('settings');
    if (widget.headerType === HeaderType.DARK) {
        chatSettings.classList.add('dark');
    }
    chatSettings.onclick = () => redirectToWidgetForm(widget.id);
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
        if (message.isOnRightSide) {
            messageContainer.classList.add('mine');
        }
        const personImgContainer = document.createElement('figure');
        personImgContainer.classList.add('person');
        message.isOnRightSide ? personImgContainer.classList.add('right') : personImgContainer.classList.add('left');
        const personImg = document.createElement('img');
        personImg.classList.add('person-img');
        personImg.src = message.img;
        personImgContainer.appendChild(personImg);
        messageContainer.appendChild(personImgContainer);
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'triangle')
        message.isOnRightSide ? messageBubble.classList.add('right') : messageBubble.classList.add('left');
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
    if (widget.column === 3) {
        const column = document.getElementById('column3-widgets');
        column.appendChild(widgetContainer);
    } else {
        const column = document.getElementById('column' + widget.column);
        column.appendChild(widgetContainer);
    }
}

const redirectToWidgetForm = (id) => {
    location.href = 'http://localhost:3000/app/widget-form/' + id;
}

const redirectToHomepage = () => {
    location.href = 'http://localhost:3000/app/dashboard/';
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

const HeaderType = {
    LIGHT: 0,
    DARK: 1
}