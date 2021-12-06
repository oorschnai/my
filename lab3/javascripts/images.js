$(document).ready(()=>{
    $('.addPaintDiv').on("click", "button", ()=>{
        addImgB();
    })
});

function addImgB(){
    let dia = $("#addImgDia");
    dia.show();
}

function deleteImg(){
    alert("Image deleted")
}

function editImg(){
    let id = event.target.getAttribute('data-arg1');
    let arr = ['#td1' + id, '#td2' + id, '#td3' + id, '#td4' + id, '#td5' + id];
    let buttonId = '#button' + id;
    console.log("id = ", id, " val = ", $(buttonId).text());
    if ($(buttonId).text() === 'edit') {
        for (let tdId of arr)
            $(tdId).attr("contenteditable", true);
        $(buttonId).text('save');
    } else {
        for (let tdId of arr)
            $(tdId).attr("contenteditable", false);
        $(buttonId).text('edit');
        let body = {
            title: $(arr[0]).text(),
            painter: $(arr[1]).text(),
            price: $(arr[2]).text(),
            min: $(arr[3]).text(),
            max: $(arr[4]).text()
        };
        console.log("body  = ", body)
        callAjax(id, JSON.stringify(body), () => {
            console.log("save edit");
        });
    }
}

function callAjax(id, body, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(this.responseText);

    };
    xhttp.open("POST", `/editImg/${id}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(body);
}

