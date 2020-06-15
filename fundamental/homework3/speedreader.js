"use strict";
/*
Athor: Le Yang 1751894
Summary: This assignment tests understanding of JavaScript and its interaction with HTML user interfaces. It is about creating a web page for speed reading training
File Content: 
speadreader.html, web page
speedreader.css, the style sheet of web page
speedreader.js, the JavaScript code for web page
*/
var myTimer;
var speed = 171;
var i = 0; // word number of the text
var times = 0; //times for interval

// Start up javascript code once the page has finished loading
window.onload = function () {
    document.getElementById("stop").disabled = true;
    document.getElementById("start").onclick = Start;
    document.getElementById("stop").onclick = Stop;
    document.getElementById("medium").onclick = Medium;
    document.getElementById("big").onclick = Big;
    document.getElementById("bigger").onclick = Bigger;
    document.getElementById("speed").onchange = Speedchange;

};

//Start the animation after pushing the start button
function Start() {
    var text = document.getElementById("inputtext").value;
    var words = text.split(/[ \n\t]+/);
    document.getElementById("inputtext").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;

    i = 0;
    myTimer = setInterval(Animation, speed, words);

}

//Start the animation after pushing the stop button
function Stop() {
    clearInterval(myTimer);
    document.getElementById("textarea").innerHTML = "";
    document.getElementById("inputtext").disabled = false;
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
}

//show the animation, decide which word of the text to show
function Animation(words) {
    var l1 = words.length; // text length
    var l2; // word length
    var word;
    var myDate = new Date();
    if (i == l1) {
        Stop();
    } else {
        l2 = words[i].length;
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

//change the speed
function Speedchange() {
    speed = document.getElementById("speed").value;
    if (document.getElementById("start").disabled == true) {
        clearInterval(myTimer);
        var text = document.getElementById("inputtext").value;
        var words = text.split(/[ \n\t]+/);
        myTimer = setInterval(Animation, speed, words);
    }
}

//set the font size to medium, after user choose the medium radio
function Medium() {
    document.getElementById("textarea").style.fontSize = "36pt";
}

//set the font size to big, after user choose the big radio
function Big() {
    document.getElementById("textarea").style.fontSize = "48pt";
}

//set the font size to bigger, after user choose the bigger radio
function Bigger() {
    document.getElementById("textarea").style.fontSize = "60pt";
}