window.onload = function () {
    // var car = document.getElementById('car');
    // console.log(car.className === 'car');

    // // TODO excercise code...

    //
    // for (let i = 0; i < car.childNodes.length; i++) {
    //     const node1 = car.childNodes[i];
    //     if (node1.className == "body") {
    //         for (let j = 0; j < node1.childNodes.length; j++) {
    //             const node2 = node1.childNodes[j];
    //             if (node2.className == "door") {
    //                 for (let k = 0; k < node2.childNodes.length; k++) {
    //                     const node3 = node2.childNodes[k];
    //                     if (node3.className == "glass") {
    //                         node3.style.color = "red";
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    var glasses = document.querySelectorAll(".glass");
    for (let i = 0; i < glasses.length; ++i) {
        glasses[i].style.color = "red";
    }
};