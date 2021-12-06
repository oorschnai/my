function editSettings() {
  let arr = ['#td0', '#td1', '#td2', '#td3', '#td4'];
  console.log("val = ", $('#settingsEdit').text());

  if ($('#settingsEdit').text() === 'edit') {
    for (let tdId of arr) $(tdId).attr("contenteditable", true);

    $('#settingsEdit').text('save');
  } else {
    for (let tdId of arr) $(tdId).attr("contenteditable", false);

    $('#settingsEdit').text('edit');
    let body = {
      date: $(arr[0]).text(),
      time: $(arr[1]).text(),
      timeout: $(arr[2]).text(),
      interval: $(arr[3]).text(),
      pause: $(arr[4]).text()
    };
    console.log("body  = ", body);
    callAjax(JSON.stringify(body), () => {
      console.log("save new settings info");
    });
  }
}

function callAjax(body, callback) {
  console.log("in ajax body = ", body);
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) callback(this.responseText);
  };

  xhttp.open("POST", `/editSettings`, true);
  xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhttp.send(body);
}