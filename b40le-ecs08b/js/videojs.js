/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    setTimeout(function () {
        reproductorVideo();
    }, 1000);
});

function reproductorVideo() {
    var videoCont = document.getElementById("videoInterac");
    var pausePlay = false;
    videoCont.play();
    $('#btnPause').on('click', function () {
        if (!pausePlay) {
            pausePlay = true;
            videoCont.pause();
            clearInterval(timeBarra);
            $("#btnPlay").css('visibility', 'visible');
            $("#btnPause").css('visibility', 'hidden');
        }
    });
    $("#btnPlay").on('click', function () {
        if (pausePlay) {
            pausePlay = false;
            iniInterval();
            videoCont.play();
            $("#btnPlay").css('visibility', 'hidden');
            $("#btnPause").css('visibility', 'visible');
        }
    });

    $('#btnStop').on('click', function () {
        $("#currentBuffer").css("left", "0px");
        $("#videoBufferMov").css("width", $("#currentBuffer").css("left"));
        $("#currentBufferFake").css("left", $("#currentBuffer").css("left"));
        pausePlay = true;
        $("#btnPlay").css('visibility', 'visible');
        $("#btnPause").css('visibility', 'hidden');
        clearInterval(timeBarra);
        videoCont.pause();
        videoCont.currentTime = 0;
    });


    var volumeFalse = false;
    $('#btnVolumeLow').on('click', function () {
        if (!volumeFalse) {
            volumeFalse = true;
            videoCont.muted = true;
            $("#btnVolumeLoud").css('visibility', 'visible');
            $("#btnVolumeLow").css('visibility', 'hidden');
        }

    });
    $('#btnVolumeLoud').on('click', function () {
        if (volumeFalse) {
            volumeFalse = false;
            videoCont.muted = false;
            $("#btnVolumeLow").css('visibility', 'visible');
            $("#btnVolumeLoud").css('visibility', 'hidden');
        }
    });

    $("#barra").append("<div id ='videoBuffer'></div>");
    $("#barra").append("<div id ='videoBufferMov'></div>");
    $("#videoBuffer").append("<div id ='currentBuffer'></div>");
    $("#videoBuffer").append("<div id ='currentBufferFake'></div>");
    $("#videoBufferMov").css("background-color", "#8dc1e9");



    $("#currentBufferFake").draggable({axis: "x", containment: "parent",
        start: function () {
            clearInterval(timeBarra);
           // console.log("iniciando");
        },
        drag: function () {
            // console.log("el left " + $(this).css("left") + " el left " + $(this).css("width"));

            var thisLeft = $(this).css("left");
            var thisWidth = $(this).css("width");
            thisLeft = thisLeft.substring(0, thisLeft.length - 2);
            thisWidth = thisWidth.substring(0, thisWidth.length - 2);


            $("#currentBuffer").css("left", $(this).css("left"));
            $("#videoBufferMov").css("width", $(this).css("left"));

        },
        stop: function () {
            acomodaFake();
            console.log("-1 " + $(this).css("left"));
            arrastraBarraVideo($(this).css("left"));
            iniInterval();
        }
    });

    var duracionVideo;

    function arrastraBarraVideo(avanzado) {
        console.log("-------------");
        console.log("0 "+avanzado );
        var _avanzado = avanzado.substring(avanzado.length - 2, avanzado.length - avanzado.length);
        _avanzado = parseInt(_avanzado);
        console.log("1 "+_avanzado );
        var percentAvanzado = (((_avanzado) / 250) * 100);
        percentAvanzado = Math.round(percentAvanzado);
        console.log("2 " + percentAvanzado);
        duracionVideo = videoCont.duration;
        duracionVideo = Math.round(duracionVideo);
        var percentVideo = (((duracionVideo) * percentAvanzado) / 100);
        percentVideo = Math.round(percentVideo);
        
        console.log("3  " + percentVideo);

        videoCont.currentTime = percentVideo;
        videoCont.play();
    }

    var timeBarra;
    iniInterval();
    function iniInterval() {
        timeBarra = setInterval(function () {
            avanzaBarraVideo();
        }, 1000);
    }
    var porAvanzar;
    function avanzaBarraVideo() {

        duracionVideo = videoCont.duration;
        duracionVideo = Math.round(duracionVideo);

        porAvanzar =  Math.round(250/(duracionVideo));

        $("#currentBuffer").css("left", "+="+porAvanzar+"px");
        acomodaFake();
        $("#videoBufferMov").css("width", $("#currentBuffer").css("left"));

        var fin = $("#currentBuffer").css("left").substring(0, $("#currentBuffer").css("left").length - 2);
        //console.log("termina video " + fin);
        if (videoCont.ended) {

            clearInterval(timeBarra);
            $("#btnPlay").css('visibility', 'visible');
            $("#btnPause").css('visibility', 'hidden');
             $('#btnStop').trigger("click")
        }
    }
    function acomodaFake() {

        //console.log("la posicion " +$("#currentBuffer").css("left") );
        var leftRealBuffer = $("#currentBuffer").css("left");
        leftRealBuffer = leftRealBuffer.substring(0, leftRealBuffer.length - 2);
        // console.log("la posicion " + leftRealBuffer);
        if (parseInt(leftRealBuffer) >= 255) {
            console.log("cambio");
            $("#currentBufferFake").css("left", (leftRealBuffer + 10) + "px");
        } else {
            console.log(" no cambio");
            $("#currentBufferFake").css("left", (leftRealBuffer - 4) + "px");
        }

    }
}