"use strict";

// Start up javascript code once the page has finished loading
window.onload = function () {
	document.getElementById("pimp").onclick = pimpin;
	document.getElementById("bling").onchange = blingin;
	document.getElementById("snoopify").onclick = snoopify;

};

function pimpin() {
	//alert("Hello, world!");
	document.getElementById("text").style.fontSize = "24pt";
}

function blingin() {
	//alert("Hello, world!");
	if (document.getElementById("bling").checked == true) {
		document.getElementById("text").style.fontWeight = "bold";
		document.getElementById("text").style.color = "green";
		document.getElementById("text").style.textDecoration = "underline line-through";
		//document.getElementById("text").style.textDecoration = "line-through";
	} else {
		document.getElementById("text").style.fontWeight = "normal";
		document.getElementById("text").style.color = "black";
		document.getElementById("text").style.textDecoration = "none";
	}
}

function snoopify() {
	var str = document.getElementById("text").value;
	str = str.toUpperCase();
	var parts = str.split(".");
	str = parts.join("-izzle") + ".";
	document.getElementById("text").value = str;
}