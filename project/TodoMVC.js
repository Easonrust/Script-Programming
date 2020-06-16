// model for localstorage
var model = window.model;
// Set some const status string
const CL_COMPLETED = 'Completed';
const CL_SELECTED = 'selected';
const CL_ACTIVE = 'Active';
const CL_URGENT = 'Urgent';
const CL_INURGENT = 'inUrgent';

// Search helper
var $ = function (sel) {
    return document.querySelector(sel);
};
var $All = function (sel) {
    return document.querySelectorAll(sel);
};
// Update the list
function update() {
    let filter = model.data.filter;
    let items = model.data.items;
    let list = $('#todo-list');
    let active = $('.todo-count');

    // Clear the list
    list.innerHTML = '';

    for (let i = 0; i < items.length; ++i) {
        let item = items[i];
        if (item.state == filter || filter == 'All' || item.urgent == filter) {
            let tempItem = createItem(item.msg);
            tempItem.id = 'item_' + i;
            tempItem.classList.add(item.state);
            //console.log(tempItem.id);
            if (item.urgent == CL_URGENT) {
                tempItem.querySelector('.tui-checkbox').checked = true;
            } else {
                tempItem.querySelector('.tui-checkbox').checked = false;
            }
            if (item.state == CL_ACTIVE) {
                tempItem.querySelector('.tui-checkbox').disabled = false;
                list.insertBefore(tempItem, list.firstChild);
            } else {
                tempItem.querySelector('.tui-checkbox').disabled = true;
                list.appendChild(tempItem);
            }
        }
    }
    //console.log('items.length:'+items.length);
    console.log('list.children.length:' + list.children.length);

    active.innerHTML = list.children.length + ' items left';
}

//创建todo条目
function createItem(message) {
    let item = document.createElement('div');
    item.classList.add('list-item');



    let itemContent = document.createElement('div');
    itemContent.classList.add('item-content');
    itemContent.innerHTML = message;

    let itemRemove = document.createElement('div');
    itemRemove.classList.add('item-remove');
    itemRemove.innerHTML = '&#10005';

    let itemLable = document.createElement('label');
    itemLable.innerHTML = '<input name="checkbox" value="Item 1" type="checkbox" class="tui-checkbox">';


    item.appendChild(itemContent);
    item.appendChild(itemRemove);
    item.appendChild(itemLable);

    itemLable.querySelector('.tui-checkbox').onchange = (function (ev) {
        let id = item.id.split('_')[1]
        if (model.data.items[id].urgent == CL_INURGENT) {
            model.data.items[id].urgent = CL_URGENT;
        } else {
            model.data.items[id].urgent = CL_INURGENT;
        }
        model.flush();
        update();
        ev.stopPropagation();
    });

    itemLable.addEventListener("touchend", function (ev) {
        ev.stopPropagation();
    });

    itemLable.addEventListener("touchstart", function (ev) {
        ev.stopPropagation();
    });




    item.addEventListener("touchstart", function (e) {
        console.log('touchstart');
        timer = setTimeout(function () {
            console.log('LongPress');
            var editBox = document.createElement('input');
            var finished = false;
            editBox.setAttribute('class', 'item-content');
            editBox.setAttribute('type', 'text');
            editBox.setAttribute('value', itemContent.innerHTML);

            function finish() {
                if (finished) return;
                finished = true;
                editBox.remove();
            }

            editBox.addEventListener('blur', function () {
                itemContent.innerHTML = this.value;
                var id = item.id.split('_')[1];
                console.log('id:' + id);
                model.data.items[id].msg = this.value;
                model.flush();
                update();
                finish();
            });

            editBox.addEventListener('keyup', function (ev) {
                if (ev.keyCode == 13) {
                    var id = item.id.split('_')[1];
                    console.log('id:' + id);
                    model.data.items[id].msg = this.value;
                    model.flush();
                    update();
                    finish();
                }
            });
            editBox.addEventListener('touchend', function (ev) {

                //阻止事件冒泡
                ev.stopPropagation()
            })
            itemContent.innerHTML = '';
            itemContent.appendChild(editBox);
            editBox.focus();
            e.preventDefault();
        }, 800);
    });
    item.addEventListener("touchmove", function (e) {
        console.log('touchmove');
        clearTimeout(timer);
        timer = 0;
    });
    item.addEventListener("touchend", function (e) {
        console.log('touchend');
        clearTimeout(timer);
        if (timer != 0) {
            let id = item.id.split('_')[1];

            if (item.classList.contains(CL_COMPLETED)) {
                item.classList.remove(CL_COMPLETED);
                model.data.items[id].state = CL_ACTIVE;
                model.data.items[id].urgent = CL_INURGENT;
            } else {
                item.classList.remove(CL_ACTIVE);
                model.data.items[id].state = CL_COMPLETED;
                model.data.items[id].urgent = CL_INURGENT;
            }
            model.flush();
            update();
        }
        return false;
    });



    itemRemove.addEventListener('touchend', function (ev) {
        let id = item.id.split('_')[1];
        model.data.items.splice(id, 1);
        model.flush();
        update();

        //阻止事件冒泡
        ev.stopPropagation()
    })

    return item;
}

function addNewItem() {
    let content = $('#input-content');
    var message = content.value.split("+");
    if (!message) {
        console.warn('message is empty');
        return;
    } else {
        for (let i = 0; i < message.length; ++i) {
            let newItem = {
                msg: message[i],
                state: CL_ACTIVE,
                urgent: CL_INURGENT
            };
            console.log('message:' + message[i]);
            model.data.items.push(newItem);
            model.flush();
            update();
            content.value = '';
        }
    }
}

function clearCompletedItems() {
    let items = model.data.items;
    for (let i = items.length - 1; i >= 0; --i) {
        let temp = items[i];
        console.log(i);
        if (temp.state == CL_COMPLETED) {
            console.log('Delete item ' + i);
            items.splice(i, 1)
        }
    }
    model.flush();
    update();
}

function selectAllItems() {
    let items = model.data.items;
    let toggleAll = $('.toggle-all');
    let newState;

    //console.log('select all');
    if (toggleAll.classList.contains(CL_SELECTED)) {
        toggleAll.classList.remove(CL_SELECTED)
        newState = CL_ACTIVE;
    } else {
        //console.log('unselected');
        toggleAll.classList.add(CL_SELECTED);
        newState = CL_COMPLETED;
    }
    for (let i = 0; i < items.length; ++i) {
        items[i].state = newState;
    }
    model.flush();
    update();
}

window.onload = function () {
    model.init(update);

    $('#input-content').addEventListener('keyup', function (ev) {
        if (ev.keyCode != 13) return;
        addNewItem();
    }, )

    $('#add').addEventListener('touchend', addNewItem);

    $('.clear-completed').addEventListener('touchend', clearCompletedItems);

    $('.toggle-all').addEventListener('touchend', selectAllItems);

    let filters = $All('.filters li a');
    for (let i = 0; i < filters.length; ++i) {
        (function (filter) {
            filter.addEventListener('touchend', function () {
                for (let j = 0; j < filters.length; ++j) {
                    filters[j].classList.remove(CL_SELECTED);
                }
                console.log('filter:' + filter.innerHTML);
                filter.classList.add(CL_SELECTED);
                model.data.filter = filter.innerHTML;
                model.flush();
                update();
            });
        })(filters[i])
    }
}