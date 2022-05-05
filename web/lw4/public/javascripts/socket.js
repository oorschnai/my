////@flow
let socket = io();

socket.on('connect', () => {
    socket.emit("hello", {'name': $('#personName').val()});
});

socket.on('smbdConnect', (data) => {
    $('#stateAuction').append('<p>'+data.msg);
});

socket.on('start', (data) => {
    $('#submitBet').prop('disabled', true);
    let pic = data.picture;
    console.log("must starting");
    console.log('pict = ', pic.imgName);
    $('#timeFromStart').show();
    showCurrImg(pic);
    $('#submitBet').prop('disabled', false);
    $('#stateAuction').append('<p><strong> Начало аукциона! </strong> Время на изучение картины</p>');

    let timer = 1;
    window.timeFromStart = setInterval(()=>{
        $('#timeFromStart').text("Время с начала аукциона: " + timer + "сек")
        timer++;
    },1000);

    if ($('#personName').val() === 'admin')
        setTimeout(startSale, data.settings[0].pause*1000);

});

socket.on('startSale', (data) => {
    $('#stateAuction').append('<p>Начало продаж</p>');
    $('#submitBet').prop('disabled', false);
    window.lastBetId = -1;
    if ($('#personName').val() === 'admin')
        window.timeout = setInterval(() => {
        //////
        next(data.id);
        clearInterval(window.timeToNext);
        clearInterval(window.timeout);
    },data.settings[0].timeout*1000);
    if ($('#personName').val() === 'admin')
        window.timeToNext = setTimeout(next, data.settings[0].interval * 1000, data.id);

});

socket.on('nextPainting', (data) => {
    //$('#money').text('Денежный запас: ' + members[$('#personId')].money);
    if(window.lastBetId !== -1)
        $('#stateAuction').append('<p> Картину купил(а) '+ data.members[window.lastBetId].name);
    else
        $('#stateAuction').append('<p> Картину НЕ купили');
    $('#stateAuction').append('<p>Следующая картина. Время на изучение.</p>');
    $('#submitBet').prop('disabled', true);
    showCurrImg(data.picture);
    if ($('#personName').val() === 'admin')
        setTimeout(startSale, data.settings[0].pause*1000);

});

socket.on('end', () => {
    $('#currPainting').empty();
    $('#submitBet').prop('disabled', true);
    if(window.lastBetId !== -1)
        $('#stateAuction').append('<p> Картину купил(а) '+ data.members[window.lastBetId].name);
    else
        $('#stateAuction').append('<p> Картину НЕ купили');
    //if ($('#personName').val() === 'admin'){
    $('#stateAuction').append('<h5>КОНЕЦ</h5>');
    clearInterval(window.timeFromStart);
});

socket.on('bet', (data) => {
    console.log('bet', data);
    window.lastBetId = data.mem.id;
    if ($('#personId').val() === data.mem.id){
        $('#submitBet').prop('disabled', true);
    }
    else {
        $('#submitBet').prop('disabled', false);
    }
    $('#stateAuction').append('<p>Новая ставка: ' + data.price + " от "+ data.mem.name);
});


function showCurrImg(pic){
    $('#currPainting').empty();
    $('#currPainting').prepend($('<img>',{src:pic.imgName, width: 150}));
    $('#currPainting').append( "<p>Название:" + pic.title + "<p>Стартовая цена:" + pic.startPrice + "</p>"+ "Шаг:" + pic.minStep + "-" + pic.maxStep)
    /*$("#spinner").spinner({
        min: pic.minStep,
        max: pic.maxStep,
        step: 1000
    });*/
    $("#spinner").attr({
        max: pic.maxStep,
        min: pic.minStep,
        step: 1000
    });
}

function startSale(){
    socket.emit('startSale');
}

function next(currId){
    socket.emit('nextPainting', {currImgId: currId, owner: window.lastBetId});
}
