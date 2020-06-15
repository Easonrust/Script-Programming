"use strict";

window.onload = function () {
  document.getElementById("validate").onclick = Validate;

};

function Validate() {
  var texts = document.querySelectorAll("#formtovalidate input");
  for (var i = 0; i < texts.length; i++) {
    if (texts[i].value === "") {
      texts[i].style.backgroundColor = "red";
    } else {
      texts[i].style.backgroundColor = "";
    }
  }
}