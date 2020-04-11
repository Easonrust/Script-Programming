"use strict";

// Start up javascript code once the page has finished loading
window.onload = function () {
    document.getElementById("stop").disabled = true;
    // document.getElementById("bling").onchange = blingin;
    document.getElementById("start").onclick = start;
    document.getElementById("medium").onclick = medium;
    document.getElementById("big").onclick = big;
    document.getElementById("bigger").onclick = bigger;

};

function start() {
    alert("Hello, world!");
}

function medium() {
    //alert(document.getElementById("medium").value);
    document.getElementById("textarea").style.fontSize = "36pt";
}

function big() {
    //alert(document.getElementById("big").value);
    document.getElementById("textarea").style.fontSize = "48pt";
}

function bigger() {
    //alert(document.getElementById("bigger").value);
    document.getElementById("textarea").style.fontSize = "60pt";
}