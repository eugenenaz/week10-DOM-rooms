class roomMate {
    constructor(name,phoneNum) {
        this.name = name;
        this.phoneNum = phoneNum;

    }
}

class Room {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.roomMates = [];
    }
    addRoomMate(roomMate) {
        this.roomMates.push(roomMate);
    }
    deleteRoommate(roomMate) {
        let index = this.roomMates.indexOf(roomMate);
        this.roomMates.splice(index, 1);
    }
}

let rooms = [];
let roomId = 0;

onClick('new-room', () => {
    rooms.push(new Room(roomId++, getValue('new-room-number')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let roomDiv = document.getElementById('rooms');
    clearElement(roomDiv);
    for (room of rooms) {
        let table = createRoomTable(room);
        let title = document.createElement('h2');
        title.innerHTML = room.name;
        title.appendChild(createDeleteRoomButton(room));
        roomDiv.appendChild(title);
        roomDiv.appendChild(table);
        for (mate of room.roomMates) {
            createMateRow(room, table, mate);
        }
    }
}

function createMateRow(room, table, mate) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = mate.name;
    row.insertCell(1).innerHTML = mate.phoneNum;
    let actions = row.insertCell(2);
    action.appendChild(createDeleteRowButton(room, mate));
}

function createDeleteRowButton(room, mate) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onClick = () => {
        let index = room.mates.indexOf(mate);
        room.mates.splice(index, 1);
        drawDOM(); 
    };
    return btn;
}

function createDeleteRoomButton(room) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Room';
    btn.onclick = () => {
        let index = rooms.indexOf(room);
        rooms.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMateButton(room) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'create';
    btn.onclick = () => {
        room.mates. push(new Room (getValue(`name-input-${room.id}`), getValue(`room-input-${room.id}`)));
        drawDOM();
    };
    return btn;
}

function createRoomTable(room) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let roomColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    roomColumn.innerHTML = 'Room';
    row.appendChild(nameColumn);
    row.appendChild(roomColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let roomTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${room.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let newMateButton = createNewMateButton(room);
    nameTh.appendChild(nameInput);
    nameTh.appendChild(nameInput);
    createTh.appendChild(newMateButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(roomTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

