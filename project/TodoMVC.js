// model for localstorage
var model = window.model;
// Set some const status string
const COMPLETED = 'Completed';
const SELECTED = 'selected';
const ACTIVE = 'Active';
const URGENT = 'Urgent';
const INURGENT = 'inUrgent';

// Search helper
var $ = function (el) {
    return document.querySelector(el);
};
var $All = function (el) {
    return document.querySelectorAll(el);
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
            if (item.urgent == URGENT) {
                tempItem.querySelector('.tui-checkbox').checked = true;
            } else {
                tempItem.querySelector('.tui-checkbox').checked = false;
            }
            if (item.state == ACTIVE) {
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

    if (list.children.length == 0) {
        if (filter == 'All') {
            list.innerHTML = "There's no todos, try to add something!";
        } else if (filter == 'Active') {
            list.innerHTML = "Well done, everything is completed!"
        } else if (filter == 'Completed') {
            list.innerHTML = "You have not completed anything yet"
        } else if (filter == 'Urgent') {
            list.innerHTML = "There's nothing urgent, maybe you can relax"
        }
    }
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
        if (model.data.items[id].urgent == INURGENT) {
            model.data.items[id].urgent = URGENT;
        } else {
            model.data.items[id].urgent = INURGENT;
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



    var x, y, X, Y, swipeX, swipeY;

    item.addEventListener("touchstart", function (e) {
        console.log('touchstart');
        x = event.changedTouches[0].pageX;
        e.preventDefault();
        e.stopPropagation();
        let inputvalue = itemContent.innerHTML;
        timer = setTimeout(function () {
            console.log('LongPress');
            var editBox = document.createElement('input');
            var finished = false;
            editBox.setAttribute('class', 'item-content');
            editBox.setAttribute('type', 'text');
            editBox.setAttribute('value', inputvalue);
            editBox.setAttribute('autofocus', 'autofocus');

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
                ev.stopPropagation();
            })

            editBox.addEventListener('touchstart', function (ev) {

                //阻止事件冒泡
                ev.stopPropagation();
            })
            itemContent.innerHTML = '';
            itemContent.appendChild(editBox);
        }, 800);
    });
    item.addEventListener("touchmove", function (e) {
        console.log('touchmove');
        clearTimeout(timer);
        timer = 0;

        X = event.changedTouches[0].pageX;
        e.stopImmediatePropagation();

        // event.stopPropagation();
        if (X - x > 10) { //右滑
            // event.preventDefault();
            item.classList.remove("swipeleft");
        }
        if (x - X > 10) { //左滑
            // event.preventDefault();
            item.classList.add("swipeleft"); //左滑展开
        }

    });
    item.addEventListener("touchend", function (e) {
        e.stopImmediatePropagation();
        console.log('touchend');
        clearTimeout(timer);
        if (timer != 0) {
            let id = item.id.split('_')[1];

            if (item.classList.contains(COMPLETED)) {
                item.classList.remove(COMPLETED);
                model.data.items[id].state = ACTIVE;
                model.data.items[id].urgent = INURGENT;
            } else {
                item.classList.remove(ACTIVE);
                model.data.items[id].state = COMPLETED;
                model.data.items[id].urgent = INURGENT;
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
        return;
    } else {
        for (let i = 0; i < message.length; ++i) {
            let newItem = {
                msg: message[i],
                state: ACTIVE,
                urgent: INURGENT
            };
            console.log('message:' + message[i]);
            model.data.items.push(newItem);
            content.value = '';
            model.flush();
            update();

        }
    }
}

function clearCompleted() {
    let items = model.data.items;
    for (let i = items.length - 1; i >= 0; --i) {
        let temp = items[i];
        console.log(i);
        if (temp.state == COMPLETED) {
            console.log('Delete item ' + i);
            items.splice(i, 1)
        }
    }
    model.flush();
    update();
}

function selectAll() {
    let items = model.data.items;
    let toggleAll = $('.toggle-all');
    let newState;

    //console.log('select all');
    if (toggleAll.classList.contains(SELECTED)) {
        toggleAll.classList.remove(SELECTED)
        newState = ACTIVE;
    } else {
        //console.log('unselected');
        toggleAll.classList.add(SELECTED);
        newState = COMPLETED;
    }
    for (let i = 0; i < items.length; ++i) {
        items[i].state = newState;
    }
    model.flush();
    update();
}

window.onload = function () {
    model.init(function () {
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
                if (item.urgent == URGENT) {
                    tempItem.querySelector('.tui-checkbox').checked = true;
                } else {
                    tempItem.querySelector('.tui-checkbox').checked = false;
                }
                if (item.state == ACTIVE) {
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

        if (list.children.length == 0) {
            if (filter == 'All') {
                list.innerHTML = "There's no todos, try to add something!";
            } else if (filter == 'Active') {
                list.innerHTML = "Well done, everything is completed!"
            } else if (filter == 'Completed') {
                list.innerHTML = "You have not completed anything yet"
            } else if (filter == 'Urgent') {
                list.innerHTML = "There's nothing urgent, maybe you can relax"
            }
        }
        $('#input-content').addEventListener('keyup', function (ev) {
            if (ev.keyCode != 13) return;
            addNewItem();
        }, )

        $('#add').addEventListener('touchend', addNewItem);

        $('.clear-completed').addEventListener('touchend', clearCompleted);

        $('.toggle-all').addEventListener('touchend', selectAll);

        let filters = $All('.filters li a');
        for (let i = 0; i < filters.length; ++i) {
            (function (filter) {
                filter.addEventListener('touchend', function () {
                    for (let j = 0; j < filters.length; ++j) {
                        filters[j].classList.remove(SELECTED);
                    }
                    console.log('filter:' + filter.innerHTML);
                    filter.classList.add(SELECTED);
                    model.data.filter = filter.innerHTML;
                    model.flush();
                    update();
                });
            })(filters[i])
        }
    });


}