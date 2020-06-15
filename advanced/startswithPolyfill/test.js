"use strict"

window.onload = function () {
    this.document.getElementById("btn").onclick = test;
};

function test() {
    var str = document.getElementById("test").innerHTML;
    str = startswith(str, "Hell", 0);
    document.getElementById("test").innerHTML = str;
}

function startswith(str, searchString, p) {
    p = p || 0;
    return str.substr(p, searchString.length) === searchString;
};