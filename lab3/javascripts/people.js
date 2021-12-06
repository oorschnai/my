$(document).ready(()=>{
    $(".addMem").on("click", "button", ()=>{
        console.log("try to add member");
        addMemB();
    })
});

function addMemB(){
    let dia = $("#addMemDia");
    dia.show();
}

function deletePers(){
    alert("Person deleted")
}

function editPers(){
    let id = event.target.getAttribute('data-arg1');
    let arr = ['#td1' + id, '#td2' + id];
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
            name: $(arr[0]).text(),
            money: $(arr[1]).text()
        };
        console.log("body  = ", body)
        callAjax(id, JSON.stringify(body), () => {
            console.log("save edited person info");
        });
    }
}


function callAjax(id, body, callback) {
    console.log("in ajax body = ", body);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            callback(this.responseText);

    };
    xhttp.open("POST", `/editPers/${id}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(body);
}
