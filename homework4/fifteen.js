"use strict";

window.onload = function () {
    var puzzlearea = document.getElementById("puzzlearea");
    for (var i = 0; i < 15; i++) {
        var num=i+1;
        var tile=document.createElement("div");
        tile.className="tile";
        tile.id="tile"+num;
        tile.innerHTML=num;
        puzzlearea.appendChild(tile);
        this.console.log(tile.parentNode.id);   
    }
}