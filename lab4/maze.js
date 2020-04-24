"use strict";

var lose = null;
var start = false;
window.onload = function () {
    document.getElementById("start").onmouseover = Start
    document.getElementById("start").onclick = Restart;
    document.getElementById("end").onmouseover = overEnd;
    var boundaries = document.querySelectorAll("#maze .boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].onmouseover = overBoundary;
    }
    document.body.onmousemove = overBody;
}

function overBody(event) {
    if (lose === false && event.target == document.body) {
        overBoundary(event);
    }
}

function overBoundary(event) {
    if (lose === false) {
        lose = true;
        document.getElementById("status").innerHTML = "You lose!";
        var boundaries = document.querySelectorAll("#maze .boundary");
        for (var i = 0; i < boundaries.length; i++) {
            boundaries[i].classList.add("youlose");
        }
        event.stopPropagation(); // so the event won't reach document.body (haxor exercise)
        return false;
    }
}

function Restart() {
    lose = false;
    document.getElementById("status").innerHTML = "Find the end!";
    var boundaries = document.querySelectorAll("#maze .boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].classList.remove("youlose");
    }
}

function Start() {
    if (start == false) {
        lose = false;
        document.getElementById("status").innerHTML = "Find the end!";
        start = true;
    }

}

function overEnd() {
    if (lose === false) {
        document.getElementById("status").innerHTML = "You win! :]";
    }
}