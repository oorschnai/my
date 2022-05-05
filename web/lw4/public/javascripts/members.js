//@flow
$(document).ready(()=>{
    $("#currPainting").draggable().resizable({
        minHeight:200,
        maxHeight:500,
        minWidth:200,
        maxWidth:500
    }).css('border', 'solid 1px black');
    $("#auction").draggable().resizable({
        minHeight:200,
        maxHeight:700,
        minWidth:200,
        maxWidth:500
    }).css('border', 'solid 1px black');
    /*$("#spinner").spinner({
        min: 5000,
        max: 10000,
        step: 1000
    });*/
    //$( "#spinner" ).prop('disabled',true);
});

function bet(){
    let socket = io();
    console.log('BET ', $('#spinner').val())
    console.log("by ", $('#personId').val())
    socket.emit('bet', {id: $('#personId').val(), bet: $('#spinner').val()});
}