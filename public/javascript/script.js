
//создадим объект
var obj = [];

var serialObj = JSON.stringify(obj); //сериализуем его

localStorage.setItem("key", serialObj); //запишем его в хранилище по ключу "myKey"



//alert(obj[1].name);
var timer,time, min, sec, points = 0;


function set_time(){
    time = 60;
    sec = time % 60;
    min = (time - sec)/60;
    if(sec=='0'){
        sec = '00'
    }
}


function getTable(){
    return JSON.parse(localStorage.getItem("key"));
}


function setTable(push_obj){
    obj =JSON.parse(localStorage.getItem("key"));
    obj.push(push_obj);
    serialObj = JSON.stringify(obj);
    localStorage.setItem("key", serialObj);
}


function make_table(){
    var tbody = $('#table-result').children('<tbody>');
    tbody.empty();
    var tmp = getTable();
    alert(tmp.length);
    if (tmp != null){
        for(var i=0; i<tmp.length; i++){
            $("<tr><td>"+qwe+"</td><td>"+qwe+"</td></tr>")
        }
    }

}


set_time();

function start_timer(){
    if ($('#start-game-button').hasClass('start')){
    $("#time").text(min+':'+sec);
    $('#start-game-button').removeClass('start').html('pause');
        render_cube();
    timer = setInterval(function () {
        time = time-1;
        sec = time % 60;
        min = (time - sec)/60;
        if(sec=='0'||sec < 10){
            sec = '0'+sec;
        }
        $("#time").text(min+':'+sec);
        if(time == 0){
            $('#game-area').empty();
            clearTimeout(timer);
            set_time();
            $("#time").text(min+':'+sec);
            $('#start-game-button').addClass('start').html('start');
            $('#result').html('Your result: '+points);
            $('#points').html(0);
            $('#modal1').modal('open');
        }
    },1000);
    }else{
        $('#start-game-button').addClass('start').html('start');
        clearTimeout(timer);

    }
}


function render_cube() {
    var bottom=0,left=0, col;
    col = Math.round(Math.random()*2)+1;
    for(var i=0;i<col;i++){
        bottom = Math.round(Math.random()*($('#game-area').height()-50) );
        left = Math.round(Math.random()*($('#game-area').width()-50) + 55);
        $("<div>").attr({'class':'cube red'}).css({"bottom": bottom,"left":left}).appendTo('#game-area');
    }
}



$('#game-area').on('click','.cube',function () {
    var this_cube = $(this);
    if(!($('#start-game-button').hasClass('start'))){
        points++;
        $('#points').html(points);
        this_cube.remove();
        render_cube();
    }
});

$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%'// Ending top style attribute
        /*complete: function() {
            var push_obj = {name:$('#last_name').val,point:points};
            points = 0;
            setTable(push_obj);
            make_table();
        }*/ // Callback for Modal close
    }
);
