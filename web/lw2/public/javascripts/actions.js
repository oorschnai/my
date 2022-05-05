function allBooks(button){
    console.log("all");
    let id = button.id;
    callAjax(id, (response) => {
        let books = JSON.parse(response);
        for (const i in books){
            let str = document.getElementById(i);
            str.style.visibility = "visible";
        }
    });
}

function inLib(button){
    console.log("in lib");
    let id = button.id;
    callAjax(id, (response) => {
        let books = JSON.parse(response);
        for (const i in books){
            let str = document.getElementById(i);
            if (books[i].hidden === 1) {
                str.style.visibility = "hidden";
            } else {
                str.style.visibility = "visible";
            }
        }
    });
}

function returnDate(button){
    console.log("ret date");
    let id = button.id;
    callAjax(id, (response) => {
        console.log("im here");
        console.log(JSON.parse(response));
        let books = JSON.parse(response);
        for (let i in books){
            let str = document.getElementById(i);
            if (books[i].hidden === 1) {
                str.style.visibility = "hidden";
            } else {
                str.style.visibility = "visible";
            }
        }
    });
}

// 6 page ~74
function callAjax(id, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(this.responseText);

    };
    xhttp.open("GET", `/book/${id}`, true);
    xhttp.send();
}

function changeButton(){
    console.log("click change button");
    document.getElementById('changeDia').showModal();
}

function takeButton(){
    console.log("click take button");
    let isIn = document.getElementById("isIn").innerText;
    console.log("isIn = ", isIn);
    if (isIn === "да") {
        document.getElementById('takeDia').showModal();
    }
}

function retButton(){
    console.log("return butt");
    let isIn = document.getElementById("isIn").innerText;
    console.log("isIn = ", isIn);
    if (isIn === "нет") {
        alert('Книга возвращена');
    }
}

function addBookButton(){
    document.getElementById('addDia').showModal();

}

