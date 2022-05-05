//@flow
$(document).ready(()=>{
    $("#admAllPaintings").draggable().resizable({
        minHeight:300,
        maxHeight:500,
        minWidth:200,
        maxWidth:300
    }).css('border', 'solid 1px black');
    $("#currPainting").draggable().resizable({
        minHeight:200,
        maxHeight:500,
        minWidth:200,
        maxWidth:500
    }).css('border', 'solid 1px black');
    $("#stateAuction").draggable().resizable({
        minHeight:200,
        maxHeight:500,
        minWidth:200,
        maxWidth:500
    }).css('border', 'solid 1px black');
});

function start(){
    let socket = io();
    socket.emit('start');
    $('#startAuct').prop('disabled', true);
}

