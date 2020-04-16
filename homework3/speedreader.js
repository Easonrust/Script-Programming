"use strict";

var myTimer;
var speed = 171;
var i = 0;
var times = 0;

window.onload = function () {
    document.getElementById("stop").disabled = true;
    document.getElementById("start").onclick = Start;
    document.getElementById("stop").onclick = Stop;
    document.getElementById("medium").onclick = Medium;
    document.getElementById("big").onclick = Big;
    document.getElementById("bigger").onclick = Bigger;
    document.getElementById("speed").onchange = Speedchange;

};

function Start() {
    alert("Start to run");
    var text = document.getElementById("inputtext").value;
    var words = text.split(/[ \n\t]+/);
    console.log(words);
    document.getElementById("inputtext").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;

    i = 0;
    myTimer = setInterval(Animation, speed, words);

}

function Stop() {
    clearInterval(myTimer);
    document.getElementById("textarea").innerHTML = "";
    document.getElementById("inputtext").disabled = false;
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
}

function Animation(words) {
    var l1 = words.length;
    var l2;
    var word;
    var myDate = new Date();
    if (i == l1) {
        Stop();
    } else {
        l2 = words[i].length;
        console.log(l2);
        if (words[i][l2 - 1] == ',' || words[i][l2 - 1] == '.' || words[l2 - 1] == ':' ||
            words[l2 - 1] == '!' || words[i][l2 - 1] == '?' || words[i][l2 - 1] == ';') {
            word = words[i].substring(0, l2 - 1);
            document.getElementById("textarea").innerHTML = word;
            times += 1;
            if (times == 1) {
                console.log(myDate.getTime());
            }
            if (times == 2) {
                times = 0;
                i++;
            }
        } else {
            word = words[i];
            console.log(myDate.getTime());
            document.getElementById("textarea").innerHTML = word;
            i++;
        }

    }

}

function Speedchange() {
    speed = document.getElementById("speed").value;
    if (document.getElementById("start").disabled == true) {
        clearInterval(myTimer);
        var text = document.getElementById("inputtext").value;
        var words = text.split(/[ \n\t]+/);
        myTimer = setInterval(Animation, speed, words);
    }
}



function Medium() {
    //alert(document.getElementById("medium").value);
    document.getElementById("textarea").style.fontSize = "36pt";
}

function Big() {
    //alert(document.getElementById("big").value);
    document.getElementById("textarea").style.fontSize = "48pt";
}

function Bigger() {
    //alert(document.getElementById("bigger").value);
    document.getElementById("textarea").style.fontSize = "60pt";
}