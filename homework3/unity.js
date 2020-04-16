"use strict";

var size;
var speed = 171;
var j = 0;
var punctuation = 0;
var interval;

window.onload = function () {
    document.getElementById("Start").onclick = Start;
    document.getElementById("Stop").onclick = Stop;
    document.getElementById("Speed").onchange = Speed;
    document.getElementById("Medium").onchange = Medium;
    document.getElementById("Big").onchange = Big;
    document.getElementById("Bigger").onchange = Bigger;
};

function Interval() {
    var text = document.getElementById("text");
    var str = text.value;
    var arr = str.split(/[ ]+/);
    var Regx = /^[A-Za-z0-9']*$/;
    var screen = document.getElementById("screen");
    if (!Regx.test(arr[j])) {
        screen.innerHTML = "<p>" + arr[j].substr(0, arr[j].length - 1) + "</p>";
        if (punctuation == 0) {
            j--;
            punctuation++;
        } else {
            punctuation = 0;
        }
    } else {
        screen.innerHTML = "<p>" + arr[j] + "</p>";
    }

    j++;

    if (j >= arr.length) {
        Stop();
        clearInterval(interval);
    }

}

function reSize() {
    var radio = document.getElementsByName("Size");
    var i;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            size = radio[i].value;

        }
    }
    var screen = document.getElementById("screen");
    screen.style.height = "2" + size + "px";
    screen.style.fontSize = size + "pt";
}

function Start() {
    reSize();
    j = 1;
    document.getElementById("Start").setAttribute("disabled", true);
    document.getElementById("Start").style.backgroundColor = "#DDDDDD";
    document.getElementById("Stop").removeAttribute("disabled");
    document.getElementById("Stop").style.backgroundColor = "#FFFFFF";
    interval = setInterval(Interval, speed);
}

function Stop() {
    document.getElementById("Stop").setAttribute("disabled", true);
    document.getElementById("Stop").style.backgroundColor = "#DDDDDD";
    document.getElementById("Start").removeAttribute("disabled");
    document.getElementById("Start").style.backgroundColor = "#FFFFFF";
    document.getElementById("screen").innerHTML = "";
    var screen = document.getElementById("screen");
    screen.style.height = "100px";
    clearInterval(interval);
    j = 0;
}

function Speed() {
    speed = document.getElementById("Speed").value;
    if (j != 0) {
        clearInterval(interval);
        interval = setInterval(Interval, speed);
    }
}

function Medium() {
    reSize();
}

function Big() {
    reSize();
}

function Bigger() {
    reSize();
}