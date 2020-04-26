"use strict";
var blankTop=300;
var blankLeft=300;
window.onload = function () {
    var puzzlearea = document.getElementById("puzzlearea");
    for (var i = 0; i < 15; i++) {
        var num=i+1;
        var tile=document.createElement("div");
        tile.className="tile";
        tile.id="tile"+num;
        tile.innerHTML=num;
        tile.onclick=move;
        puzzlearea.appendChild(tile);
        this.console.log(tile.parentNode.id);   
    }
}
function move(){
    var top=this.offsetTop;
    var left=this.offsetLeft;
    if((top===blankTop)&&((left===blankLeft-100)||(left===blankLeft+100))){
		this.style.left= blankLeft+"px";
		blankLeft= left;
	}
	else if((left===blankLeft)&&((top===blankTop-100)||(top===blankTop+100))){
		this.style.top= blankTop+"px";
		blankTop=top;
	}
}