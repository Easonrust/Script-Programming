"use strict";
var activeAmount = 0;
const CL_COMPLETED = 'completed';

function $(id) {
    return document.getElementById(id);
}

function updateActive() {
    $('activeDiv').innerHTML = activeAmount + ' items left';
}
window.onload = function () {

    $('todoInput').addEventListener('keyup', function (event) {
        if (event.keyCode != 0xd) return;
        addTodo();
    });

}

function enter() {
    if (event.keyCode != 13) return; // ASCII code "enter"
    add();
}

function addTodo() {
    var todoInput = $('todoInput');
    var message = todoInput.value;
    var listDiv = $('listDiv');
    if (message == '') {
        console.warn('message is empty');
        return;
    }

    var itemDiv = document.createElement('div');
    var itemContentDiv = document.createElement('div');
    var itemDeleteButton = document.createElement('button');
    itemDiv.className = 'list-item';
    itemContentDiv.innerHTML = message;
    itemContentDiv.className = 'content';
    itemDeleteButton.type = 'button';
    itemDeleteButton.innerHTML = ' X ';
    itemDeleteButton.className = 'delete';

    itemDiv.appendChild(itemContentDiv);
    itemDiv.appendChild(itemDeleteButton);
    listDiv.insertBefore(itemDiv, listDiv.firstChild);

    todoInput.value = '';
    ++activeAmount;
    updateActive();

    // bind events
    itemDiv.addEventListener('click', function () {
        if (itemDiv.classList.contains(CL_COMPLETED)) {
            itemDiv.classList.remove(CL_COMPLETED)
                ++activeAmount;
        } else {
            itemDiv.classList.add(CL_COMPLETED)
                --activeAmount;
        }
        updateActive();
    });

    itemDeleteButton.addEventListener('click', function (event) {
        listDiv.removeChild(itemDiv);
        if (!itemDiv.classList.contains(CL_COMPLETED)) --activeAmount;
        updateActive();
        event.stopPropagation();
    });
}