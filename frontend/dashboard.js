const BASE_API_URL = "http://localhost:3000/widgets/";
const WIDGET_FORM_URL = "http://localhost:3000/app/widget-form/";

(() => {
  const http = new XMLHttpRequest();
  http.open("GET", BASE_API_URL);
  http.send();
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        let data = JSON.parse(http.responseText);
        data.allWidgets.forEach(widget => {
          createWidget(widget);
        });
      } else {
        alert("There was a problem with the request.");
      }
    }
  };
})();

const createWidget = widget => {
  const widgetContainer = document.createElement("article");
  widgetContainer.classList.add("widget");
  if (widget.type === WidgetType.TABLE) {
    createTable(widget, widgetContainer);
  } else if (widget.type === WidgetType.MESSAGES) {
    createChat(widget, widgetContainer);
  }

  if (widget.column === 3) {
    const column = document.getElementById("column3-widgets");
    column.appendChild(widgetContainer);
  } else {
    const column = document.getElementById("column" + widget.column);
    column.appendChild(widgetContainer);
  }
};

const createTable = (widget, widgetContainer) => {
  widgetContainer.classList.add("table");
  const table = document.createElement("table");
  table.classList.add("table-data");
  const iconsContainer = createIconsContainer(widget.id);
  widgetContainer.appendChild(iconsContainer);
  if (widget.settings) {
    table.classList.add("table-with-settings");
    const tableSettings = createSettingsHeader(
      widget.headerType,
      widget.id,
      "Dashboard: " + widget.title
    );
    widgetContainer.appendChild(tableSettings);
  }
  const tableHeader = createTableHeader(widget.id, widget.headerType);
  table.appendChild(tableHeader);
  createTableRows(widget.data, table);
  widgetContainer.appendChild(table);
  return widgetContainer;
};

const createTableHeader = (widgetId, headerType) => {
  const tableHeader = document.createElement("tr");
  tableHeader.onclick = () => redirectToWidgetForm(widgetId);
  tableHeader.title = "Click to edit widget";
  if (headerType === HeaderType.DARK) {
    tableHeader.classList.add("table-header", "dark");
  } else {
    tableHeader.classList.add("table-header");
  }
  const tableHeaderData = ["#", "First Name", "Last Name", "Username"];
  tableHeaderData.forEach(data => {
    const tableHeaderCol = document.createElement("th");
    tableHeaderCol.textContent = data;
    tableHeader.appendChild(tableHeaderCol);
  });
  return tableHeader;
};

const createTableRows = (data, table) => {
  data.forEach(rowData => {
    const tableRow = document.createElement("tr");
    const tableRowId = document.createElement("td");
    tableRowId.textContent = rowData.id;
    tableRow.appendChild(tableRowId);
    const tableRowFirstName = document.createElement("td");
    tableRowFirstName.textContent = rowData.firstName;
    tableRow.appendChild(tableRowFirstName);
    const tableRowLastName = document.createElement("td");
    tableRowLastName.textContent = rowData.lastName;
    tableRow.appendChild(tableRowLastName);
    const tableRowUsername = document.createElement("td");
    tableRowUsername.textContent = rowData.userName;
    tableRow.appendChild(tableRowUsername);
    table.appendChild(tableRow);
  });
};

const createChat = (widget, widgetContainer) => {
  widgetContainer.classList.add("chat");
  const iconsContainer = createIconsContainer(widget.id);
  widgetContainer.appendChild(iconsContainer);
  const chatSettings = createSettingsHeader(
    widget.headerType,
    widget.id,
    "Conversation: " + widget.title
  );
  widgetContainer.appendChild(chatSettings);
  const messages = createMessages(widget.data);
  const newMessageInput = createNewMessageInput();
  const sendBtn = createSendButton();
  widgetContainer.appendChild(messages);
  widgetContainer.appendChild(newMessageInput);
  widgetContainer.appendChild(sendBtn);
  return widgetContainer;
};

const createMessages = data => {
  const messagesContainer = document.createElement("div");
  messagesContainer.classList.add("messages");
  data.forEach(message => {
    createMessage(message, messagesContainer);
  });
  return messagesContainer;
};

const createMessage = (message, messagesContainer) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");
  if (message.isOnRightSide) {
    messageContainer.classList.add("right-side");
  }
  const personImgContainer = createPersonImage(message);
  messageContainer.appendChild(personImgContainer);
  const messageBubble = createMessageBubble(message);
  messageContainer.appendChild(messageBubble);
  messagesContainer.appendChild(messageContainer);
  return messagesContainer;
};

const createPersonImage = message => {
  const personImgContainer = document.createElement("figure");
  personImgContainer.classList.add("person");
  message.isOnRightSide
    ? personImgContainer.classList.add("right")
    : personImgContainer.classList.add("left");
  const personImg = document.createElement("img");
  personImg.classList.add("person-img");
  personImg.src = message.img;
  personImgContainer.appendChild(personImg);
  return personImgContainer;
};

const createMessageBubble = message => {
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble", "triangle");
  message.isOnRightSide
    ? messageBubble.classList.add("right")
    : messageBubble.classList.add("left");
  const person = document.createElement("p");
  person.textContent = message.author;
  messageBubble.appendChild(person);
  const messageText = document.createElement("p");
  messageText.textContent = message.message;
  messageBubble.appendChild(messageText);
  return messageBubble;
};

const createNewMessageInput = () => {
  const newMessageInput = document.createElement("input");
  newMessageInput.type = "text";
  newMessageInput.placeholder = "Type and press enter";
  newMessageInput.classList.add("new-message");
  return newMessageInput;
};

const createIconsContainer = widgetId => {
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("edit-delete-icons-container");
  const editIcon = createIcon(
    "edit",
    "edit.svg",
    redirectToWidgetForm,
    widgetId
  );
  iconsContainer.appendChild(editIcon);
  const deleteIcon = createIcon("delete", "delete.svg", deleteWidget, widgetId);
  iconsContainer.appendChild(deleteIcon);
  return iconsContainer;
};

const createIcon = (type, imgSrc, action = null, parameter = null) => {
  const icon = document.createElement("img");
  icon.classList.add(type + "-icon");
  icon.src = imgSrc;
  if (action !== null) {
    icon.onclick = () => action(parameter);
  }
  return icon;
};

const createSendButton = () => {
  const sendBtn = document.createElement("button");
  sendBtn.classList.add("send-btn");
  sendBtn.textContent = "Send";
  const sendIcon = createIcon("send", "send.svg");
  sendBtn.appendChild(sendIcon);
  return sendBtn;
};

const createSettingsIcon = () => {
  const settingsIcon = document.createElement("div");
  settingsIcon.classList.add("settings-icon", "arrow-bottom");
  return settingsIcon;
};

const createSettingsHeader = (headerType, widgetId, widgetHeader) => {
  const settingsHeader = document.createElement("div");
  settingsHeader.classList.add("settings");
  if (headerType === HeaderType.DARK) {
    settingsHeader.classList.add("dark");
  }
  settingsHeader.onclick = () => redirectToWidgetForm(widgetId);
  settingsHeader.title = "Click to edit widget";
  const settingsHeaderText = document.createElement("p");
  settingsHeaderText.textContent = widgetHeader;
  settingsHeader.appendChild(settingsHeaderText);
  const settingsIcon = createSettingsIcon();
  settingsHeader.appendChild(settingsIcon);
  return settingsHeader;
};

const redirectToWidgetForm = (id = null) => {
  if (id) {
    location.href = WIDGET_FORM_URL + id;
  } else {
    location.href = WIDGET_FORM_URL;
  }
};

const redirectToHomepage = () => {
  location.href = "http://localhost:3000/app/dashboard/";
};

const toggleMobileMenu = () => {
  const mobileMenuContainer = document.getElementById("mobile-menu-container");
  mobileMenuContainer.classList.toggle("change");
};

const deleteWidget = id => {
  const http = new XMLHttpRequest();
  const url = BASE_API_URL + id;
  http.open("DELETE", url, true);
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        location.reload();
      } else {
        alert("There was a problem with the request.");
      }
    }
  };
  http.send(null);
};

const WidgetType = {
  TABLE: 0,
  MESSAGES: 1
};

const HeaderType = {
  LIGHT: 0,
  DARK: 1
};
