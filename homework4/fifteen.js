"use strict";
var blankX = 4;
var blankY = 4;
window.onload = function () {
    var puzzlearea = document.getElementById("puzzlearea");
    for (var i = 0; i < 15; i++) {
        var num = i + 1;
        var tile = document.createElement("div");
        puzzlearea.appendChild(tile);
        tile.className = "tile";
        var x = Math.floor(i / 4) + 1;
        var y = Math.floor(i % 4) + 1;
        tile.id = "tile_" + x + "_" + y;
        tile.innerHTML = num;
        tile.onclick = click;
        tile.onmouseover = over;
        tile.onmouseout = out;
        this.console.log(tile.parentNode.id);
    }
    var tiles = document.querySelectorAll(".tile");
    var i = 0;
    for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
            tiles[i].style.backgroundPosition = k * -100 + "px" + " " + j * -100 + "px";
            i += 1;
            if (i == 15) {
                break;
            }
        }
    }

    document.getElementById("shufflebutton").onclick = shuffle;
}

function checkwin() {
    var win = true;
    for (var i = 0; i < 16; i++) {

        var x = Math.floor(i / 4) + 1;
        var y = Math.floor(i % 4) + 1;
        if (x != blankX || y != blankY) {
            var id = "tile_" + x + "_" + y;
            var tile = document.getElementById(id);
            if (tile.offsetTop != (-parseInt(tile.style.backgroundPositionY)) || tile.offsetLeft != (-parseInt(tile.style.backgroundPositionX))) {
                win = false;
            }
        }
    }
    if (win == true) {
        alert("You Win!");
    }
}

function click() {
    var id = this.id;
    var location = id.split("_");
    var x = parseInt(location[1]);
    var y = parseInt(location[2]);
    if (checkmove(x, y)) {
        var newid = "tile_" + blankX + "_" + blankY;
        this.id = newid;
        blankX = x;
        blankY = y;
        checkwin();
    }
}

function findNode(x, y) {
    var tiles = document.querySelectorAll(".tile");
    for(var i=0;i<tiles.length;i++){
        var id = tiles[i].id;
        var location = id.split("_");
        var xi = parseInt(location[1]);
        var yi = parseInt(location[2]);
        if(xi==x&&yi==y){
            return(tiles[i]);
        }
    }
}

function checkmove(x, y) {

    var move = false;
    if ((y === blankY) && ((x === blankX - 1) || (x === blankX + 1))) {
        move = true;
    } else if ((x === blankX) && ((y === blankY - 1) || (y === blankY + 1))) {
        move = true;
    }
    return move;
}

function over() {
    var id = this.id;
    var location = id.split("_");
    var x = parseInt(location[1]);
    var y = parseInt(location[2]);
    if (checkmove(x, y)) {
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

function shuffle() {
    for (var i = 0; i < 1000; ++i) {
        var neighbors = [];
        if(blankY-1>=1){
            neighbors.push([blankX,blankY-1]);
        }
        if(blankX-1>=1){
            neighbors.push([blankX-1,blankY]);
        }
        if(blankY+1<=4){
            neighbors.push([blankX,blankY+1]);
        }
        if(blankX+1<=4){
            neighbors.push([blankX+1,blankY]);
        }
        var K = neighbors.length;
        var RD = Math.floor(Math.random() * K);
        var choice = neighbors[RD];
        var newid = "tile_" + blankX + "_" + blankY;
        var tile=findNode(choice[0],choice[1]);
        tile.id = newid;
        blankX = choice[0];
        blankY = choice[1];
    }
}