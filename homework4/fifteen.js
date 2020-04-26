"use strict";
var blankTop = 300;
var blankLeft = 300;
window.onload = function () {
    var puzzlearea = document.getElementById("puzzlearea");
    for (var i = 0; i < 15; i++) {
        var num = i + 1;
        var tile = document.createElement("div");
        tile.className = "tile";
        tile.id = "tile" + num;
        tile.innerHTML = num;
        tile.onclick = click;
        // tile.onmouseover = over;
        // tile.onmouseout = out
        puzzlearea.appendChild(tile);
        this.console.log(tile.parentNode.id);
    }
    document.getElementById("shuffle").onclick=shuffle;
}

function checkwin() {
    var win = true;
    for (var i = 0; i < 15; i++) {
        var num = i + 1;
        var id = "tile" + num;
        var left;
        var top;
        if (num % 4 == 0) {
            left = 300;
            top = (Math.floor(num / 4) - 1) * 100;
        } else {
            left = (num % 4 - 1) * 100;
            top =Math.floor(num / 4) * 100;
        }

        var tile = document.getElementById(id);
        if (tile.offsetLeft != left || tile.offsetTop != top) {
            win = false;
        }

    }
    if (win == true) {
        alert("You Win!");
    }
}

function click() {
    var top = this.offsetTop;
    var left = this.offsetLeft;
    if ((top === blankTop) && ((left === blankLeft - 100) || (left === blankLeft + 100))) {
        this.style.left = blankLeft + "px";
        blankLeft = left;
        checkwin();
    } else if ((left === blankLeft) && ((top === blankTop - 100) || (top === blankTop + 100))) {
        this.style.top = blankTop + "px";
        blankTop = top;
        checkwin();
    }

}

function over() {
    var top = this.offsetTop;
    var left = this.offsetLeft;
    var move = false;
    if ((top === blankTop) && ((left === blankLeft - 100) || (left === blankLeft + 100))) {
        move = true;
    } else if ((left === blankLeft) && ((top === blankTop - 100) || (top === blankTop + 100))) {
        move = true;
    }
    if (move) {
        this.style.borderColor = "red";
        this.style.color = "red";
        this.style.cursor = "pointer";
    } else {
        this.style.cursor = "default";
        this.style.color = "black";
        this.style.borderColor = "black";
    }
}

function out() {
    this.style.cursor = "default";
    this.style.color = "black";
    this.style.borderColor = "black";
}
function shuffle(){
    
}