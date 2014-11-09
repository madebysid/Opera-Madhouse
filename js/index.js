$(document).ready(function(){

    var devHeight = window.innerHeight,
        devWidth  = window.innerWidth;
    
    //SINGER

    var singerPosX = 0,
        singerPosY = 0,
        singerWidth = 50,
        singerHeight = 50;

    //VEGGIES

    var vegWidth = 40;
        vegHeight = 40;
        vegLevel = 1;
        vegSpeed = Math.random()*vegLevel*100,
        vegPosX = Math.random()*devWidth + vegWidth,
        vegPosY = devHeight;

    var vegCreate = function()
    {
        vegSpeed = Math.random()*vegLevel*100,
        vegPosX = Math.random()*devWidth - vegWidth,
        vegPosY = devHeight;
    },

    moveVeg = function(){
        vegPosY = vegPosY - vegSpeed;
        if(vegPosY < 0){
            vegCreate();
        }
        $(".veg").css("left" , vegPosX + 'px');
        $(".veg")
            .css("transition-property","translate 1s")
            .css("transition-duration","0.2s")
            .css("transition-timing-function","linear")
            .css("transform" , "translate(0px," + vegPosY + "px)");
    },
    
    levelUp = function(){
        vegLevel = vegLevel + 1;
    },

    collideCheck = function(){
        if(vegPosX > singerPosX - vegWidth && vegPosX < singerPosX + singerWidth)
        {
            if(vegPosY < singerPosY && vegPosY > singerPosY - singerHeight)
            {
                gameOver();
            }
        }
    },

    gameOver = function(){
        clearInterval(moveThatAss);
        alert("Game Over");
    }

    var moveThatAss = window.setInterval(function(){
        moveVeg();
        collideCheck();
    },200);

    // window.setInterval(function(){
    //     levelUp();
    // },5000);

    interact('.draggable')
        .draggable({
            onmove: function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                singerPosX = x;
                singerPosY = y;
            },
            // onend: function (event) {
            //     var textEl = event.target.querySelector('p');
                
            //     textEl && (textEl.textContent =
            //         'moved a distance of '
            //         + (Math.sqrt(event.dx * event.dx +
            //                      event.dy * event.dy)|0) + 'px');
            // }
        })
        .inertia(true)
        .restrict({
            drag: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        });

    //DOC READY ENDS
    });





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