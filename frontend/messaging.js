(() => {
    const WidgetType = {
        TABLE: 0,
        MESSAGES: 1
    }
    const url = 'http://localhost:3000/widgets/filter/' + WidgetType.MESSAGES;
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
    const iconsContainer = createIconsContainer(widget.id);
    widgetContainer.appendChild(iconsContainer);
    const chatSettings = createSettingsHeader(widget.headerType, widget.id, 'Conversation: ' + widget.title);
    widgetContainer.appendChild(chatSettings);
    const messages = createMessages(widget.data);
    const newMessageInput = createNewMessageInput();
    const sendBtn = createSendButton();
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

const createMessages = (data) => {
    const messagesContainer = document.createElement('div');
    messagesContainer.classList.add('messages');
    data.forEach(message => {
        createMessage(message, messagesContainer);
    });
    return messagesContainer;
}

const createMessage = (message, messagesContainer) => {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (message.isOnRightSide) {
        messageContainer.classList.add('right-side');
    }
    const personImgContainer = createPersonImage(message);
    messageContainer.appendChild(personImgContainer);
    const messageBubble = createMessageBubble(message);
    messageContainer.appendChild(messageBubble);
    messagesContainer.appendChild(messageContainer);
    return messagesContainer;
}

const createPersonImage = (message) => {
    const personImgContainer = document.createElement('figure');
    personImgContainer.classList.add('person');
    message.isOnRightSide ? personImgContainer.classList.add('right') : personImgContainer.classList.add('left');
    const personImg = document.createElement('img');
    personImg.classList.add('person-img');
    personImg.src = message.img;
    personImgContainer.appendChild(personImg);
    return personImgContainer
}

const createMessageBubble = (message) => {
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble', 'triangle')
    message.isOnRightSide ? messageBubble.classList.add('right') : messageBubble.classList.add('left');
    const person = document.createElement('p');
    person.textContent = message.author;
    messageBubble.appendChild(person);
    const messageText = document.createElement('p');
    messageText.textContent = message.message;
    messageBubble.appendChild(messageText);
    return messageBubble;
}

const createNewMessageInput = () => {
    const newMessageInput = document.createElement('input');
    newMessageInput.type = 'text';
    newMessageInput.placeholder = 'Type and press enter';
    newMessageInput.classList.add('new-message');
    return newMessageInput;
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

const createSendButton = () => {
    const sendBtn = document.createElement('button');
    sendBtn.classList.add('send-btn');
    sendBtn.textContent = 'Send';
    const sendIcon = createIcon('send', 'send.svg');
    sendBtn.appendChild(sendIcon);
    return sendBtn;
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