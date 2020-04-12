"use strict";

var myTimer;
var speed = 171;
var i = 0;
var times = 0;
// Start up javascript code once the page has finished loading
window.onload = function () {
    document.getElementById("stop").disabled = true;
    // document.getElementById("bling").onchange = blingin;
    document.getElementById("start").onclick = start;
    document.getElementById("stop").onclick = stop;
    document.getElementById("medium").onclick = medium;
    document.getElementById("big").onclick = big;
    document.getElementById("bigger").onclick = bigger;
    document.getElementById("speed").onchange = speedchange;

};

function start() {
    //alert("Start to run");
    var text = document.getElementById("inputtext").value;
    var words = text.split(/[ \t\n]+/);
    console.log(words);
    document.getElementById("inputtext").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;

    i = 0
    myTimer = setInterval(show, speed, words);

}

function show(words) {
    var l1 = words.length;
    var l2;
    var word;
    if (i == l1) {
        stop();
    } else {
        l2 = words[i].length;
        console.log(l2);
        if (words[i][l2 - 1] === ',' || words[i][l2 - 1] === '.' || words[l2 - 1] === ':' ||
            words[l2 - 1] === '!' || words[i][l2 - 1] === '?' || words[i][l2 - 1] === ';') {
            //when word ends with punctions

            word = words[i].substring(0, l2 - 1);
            document.getElementById("textarea").innerHTML = word;
            times += 1;
            if (times == 2) {
                times = 0;
                i++;
            }
        } else {
            word = words[i];
            document.getElementById("textarea").innerHTML = word;
            i++;
        }

    }

}

function stop() {
    clearInterval(myTimer);
    document.getElementById("textarea").innerHTML = "";
    document.getElementById("inputtext").disabled = false;
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
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

function speedchange() {
    speed = document.getElementById("speed").value;
    if (document.getElementById("start").disabled == true) {
        clearInterval(myTimer);
        var text = document.getElementById("inputtext").value;
        var words = text.split(" ");
        //restart without initial set
        myTimer = setInterval(show, speed, words);
    }
}