$(document).ready(function(){
    $('.splash').hide();
    $('.mainMenu').show();
    $('.mainGame').hide();
    $('.retry').hide();
});

var devHeight = parseInt(window.innerHeight),
    devWidth  = parseInt(window.innerWidth);

var singerPosX = 0,
    singerPosY = 0,
    singerWidth = devWidth/6,
    singerHeight = devHeight/15;

var vegCount = 0;

var veg = function(vegId,vegLevel){
    var vegWidth = devWidth/12;
    var vegHeight = vegWidth;
    var vegLevel = vegLevel;
    var vegSpeed = Math.random()*vegLevel*100;
    var vegPosX = Math.random()*devWidth + vegWidth;
    var vegPosY = devHeight - vegHeight;

    console.log("veg"+vegId+"created");

    var moveVeg = function(){
        vegPosY = vegPosY - vegSpeed;
        if(vegPosY < 0){
            vegPosY = devHeight - vegHeight;
            vegPosX = Math.random()*devWidth + vegWidth;
            $("#veg"+vegId)
                .css("transform" , "translate(0px," + vegPosY + "px)");
        }
        $("#veg"+vegId).css("left" , vegPosX + 'px');
        $("#veg"+vegId)
            .css("transition-property" , "translate 1s")
            .css("transition-duration" , "0.2s")
            .css("transition-timing-function" , "linear")
            .css("transform" , "translate(0px," + vegPosY + "px)");
    };
    var collideCheck = function(){
        if(vegPosX>singerPosX-vegWidth && vegPosX<singerPosX+singerWidth && vegPosY<singerPosY && vegPosY>singerPosY-singerHeight)
        {
            clearInterval(moveThatAss);
            gameOver();
        }
    };
    var stopVeg = function(){
        clearInterval(moveThatAss); 
        //$("#veg"+vegId).remove();
        //newVeg = new veg(0,1);
    };
    var levelUp = function(){
        vegLevel = vegLevel + 1;
    };

    var moveThatAss = setInterval(function(){
        moveVeg();
        collideCheck();
    },200);

};

var vegCreate = function(){
    // $(".mainGame")
        // .append("<div class='veg' id='veg'"+ vegCount +">VEG "+ vegCount + "</div>");
    // var vegDiv = document.createElement(div);
    // vegDiv.className = 'veg';
    // vegDiv.id = 'veg'+vegCount;
    // $('.mainGame').appendChild(vegDiv);
    new veg(vegCount,1);
    vegCount++;
};

var gameInit = function(){
    $('.mainMenu').hide();
    $('.mainGame').show();
    //$('.veg').remove();

    $('#singer')
        .css("width" , singerWidth + 'px')
        .css("height" , singerHeight + 'px');

    for(i=0;i<10;i++)
       vegCreate();

    // window.setInterval(function(){
    //     levelUp();
    // },5000);
},

    gameOver = function(){
        console.log("Game Over");
        $('.mainGame').hide();
        $('.retry')
            .show();
            
        $('.endDetails').html("Your Score: " + theTime);
        clearInterval(timer);
        // alert("Game Over, Bitch");
    };

var theTime=0;

var theTimekeeper = function()
{
    theTime++;
}

var timer = setInterval(theTimekeeper,1000);

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

interact('.draggable')
    .draggable({
        onmove: function (event) {
            var target = event.target;
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            singerPosX = x;
            singerPosY = y;
        }
    })
    .inertia(true)
    .restrict({
        drag: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    });