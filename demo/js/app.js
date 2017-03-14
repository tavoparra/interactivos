//(function($, window, undefined) {

    var ejercicio = {

        pageControl: {

            settings: {
                $allpages: $(''),
                currentPage: 0
            },

            // DECLARAMOS LAS PÁGINAS QUE TENDRÁ EL EJERCICIO INCLUYENDO SU LÓGICA Y CONTROLES

            pages: [
                {
                    id: 'reactivo01',
                    pInitCallback : function () { react01.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo02',
                    pInitCallback : function () { react02.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo03',
                    pInitCallback : function () { react03.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo04',
                    pInitCallback : function () { react04.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo05',
                    pInitCallback : function () { react05.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo06',
                    pInitCallback : function () { react06.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo07',
                    pInitCallback : function () { react07.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo08',
                    pInitCallback : function () { react08.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },
                {
                    id: 'reactivo09',
                    pInitCallback : function () { react09.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },                 
                {
                    id: 'reactivo10',
                    pInitCallback : function () { react10.init(); },
                    btnSiguiente: function () { pc.showNext(); }
                },                                                                                               
            ],

            // FUNCIONES PARA CONTROLAR EL DESPLIEGUE DE LAS PÁGINAS DEL EJERCICIO

            showNext: function () {
                pc.settings.currentPage = pc.settings.currentPage + 1;
                pc.showPage();
            },

            showHome: function () {
                $('#page-2 .pregunta-1, #page-2 .pregunta-2, #page-2 .pregunta-3').transition({ right: '-350px', x: 0 });
                $('#page-2 .pregunta-1').transition({ right: '0', x: 0 });
                $('.puzzle .pointer').transition({ x: 0, y: 0 });
                $('.retroalimentacion').html('');
                pc.settings.currentPage = 0;
                pc.showPage();
            },

            showPage: function () {

                pc.settings.$allpages.hide();


                if ( typeof pc.pages[pc.settings.currentPage].pInitCallback !== 'undefined' && typeof pc.pages[pc.settings.currentPage].pInitCallback === 'function') {
                    pc.pages[pc.settings.currentPage].pInitCallback();
                }

                pc.pages[pc.settings.currentPage].$item.css('display', 'block');
            },

            init: function () {

                $(document).ready(function () {

                    var $currentItem
                    var i;

                    for ( i = 0; i < pc.pages.length; i = i + 1) {

                        $currentItem = $('#' + pc.pages[i].id);
                        pc.pages[i].$item = $currentItem;
                        pc.settings.$allpages = pc.settings.$allpages.add($currentItem);
                    }

                    $('.btn-siguiente').each( function () {
                        $(this).on('click', function () {
                            pc.pages[pc.settings.currentPage].btnSiguiente();
                        });
                    });

                    pc.showPage();
                });
            }
        }
    };

    /****************************************************************************************
     * REACT 01
     ***************************************************************************************/

    var react01 = {

        clase: '.react01',

        elementos: ['mark', 'hours', 'minutes', 'left', 'right'],

        bind_events: function () {

            $(react01.clase).find('.mark').on('click', function () {

                modal.show('Cada rayita representa<br>un minuto.');
                react01.evaluate('mark');
            });

            $(react01.clase).find('.hour-hand').on('click', function () {

                modal.show('La manecilla larga señala<br>los minutos de cada hora.');
                react01.evaluate('hours');
            });

            $(react01.clase).find('.minute-hand').on('click', function () {

                modal.show('La manecilla corta<br>indica las horas del día.');
                react01.evaluate('minutes');
            });

            $(react01.clase).find('.hours').on('click', function () {

                modal.show('Las cifras de la izquierda señalan<br>las horas del día.');
                react01.evaluate('left');
            });

            $(react01.clase).find('.minutes').on('click', function () {

                modal.show('Los números de la derecha representan los minutos<br>de la hora.');
                react01.evaluate('right');
            });

        },

        evaluate: function (item) {

            if ( react01.elementos.length > 0 ) {

                var index = $.inArray(item, react01.elementos);

                if ( index > -1 ) {

                    react01.elementos.splice(index, 1);
                }
            }

            if ( react01.elementos.length === 0) {

                $('.btn-siguiente').show();
            }
        },

        fx: function () {

            // COGS ANIMATION

            $('.react01 .section-bg').animateSprite({
                fps: 3,
                columns: 2,
                loop: true,
                animations: { cogs: [0,2,4,6,7] }
            });

            $('.react01 .section-bg').animateSprite('play', 'cogs');

            // DIGITAL ANIMATION

            var color = '#FFFFFF';

            setInterval( function () {

                if ( color === '#FFFFFF' ) { color = '#09252C'; }
                else { color = '#FFFFFF'; }

                $('.react01 .digital-clock .time span.divider').css('color', color);

            }, 500);

            // CHANGE CLASS SEQUENTIALLY

            var elements = ['.react01 .analog-clock .mark','.react01 .analog-clock .hour-hand','.react01 .analog-clock .minute-hand','.react01 .digital-clock .hours','.react01 .digital-clock .minutes']
            var flag = 0;

            window.setInterval( function () {

                for (var i = elements.length - 1; i >= 0; i--) {
                    $( elements[i] ).removeClass('hover');
                };

                $( elements[flag] ).addClass('hover');

                flag += 1;

                if( flag === 5 ){ flag = 0; }
            }, 3000);
        },

        init: function () {

            react01.fx();
            react01.bind_events();
            $('.btn-siguiente').hide();
        }
    };

    /****************************************************************************************
     * REACT 02
     ***************************************************************************************/

    var react02 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react02.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) === 0 || Math.abs(results.minAngle) === 360 );
            var condition02 = ( Math.abs(results.minAngle) > 340 && Math.abs(results.minAngle) < 360 );
            var condition03 = ( Math.abs(results.minAngle) > 0 && Math.abs(results.minAngle) < 20 );

            var condition04 = ( Math.abs(results.hrAngle) > 190 && Math.abs(results.hrAngle) < 230 );
            var condition05 = ( Math.abs(results.spins) >= 6 && Math.abs(results.spins) <= 7 );

            if ( ( condition01 || condition02 || condition03 ) && condition04 && condition05 ) {
                
                $('.react02 .digital-clock .time span.minutes').html('00');
                $('.react02 .digital-clock .time span.hours').html('7');
                TweenMax.to( $('.react02 .bg01'), 1, {opacity:0});
                
                react02.clock.unbindAll();

                setTimeout(function () {
                    if(!react02.correct) {
                        react02.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';

            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react02 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            react02.clock = new Clock({
                minSelector: '.react02 .analog-clock .minute-hand', 
                hrSelector: '.react02 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 60,
                spins: 6
            });

            $(react02.clock).on('dragStopped', function (e) {
                react02.evaluate();
            });  
            
            $('.btn-siguiente').hide();
            react02.fx();
        }
    };

    /****************************************************************************************
     * REACT 03
     ***************************************************************************************/

    var react03 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react03.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) > 70 && Math.abs(results.minAngle) < 120 );
            var condition02 = ( Math.abs(results.hrAngle) > 190 && Math.abs(results.hrAngle) < 230 );
            var condition03 = ( Math.abs(results.spins) >= 6 && Math.abs(results.spins) <= 7 );

            if ( condition01 && condition02 && condition03 ) {
                
                $('.react03 .digital-clock .time span.minutes').html('15');
                $('.react03 .digital-clock .time span.hours').html('7');
                TweenMax.to( $('.react03 .bg01'), 1, {opacity:0});
                $('.react03 .digital-clock.one').hide();
                $('.react03 .digital-clock.two').show();
                
                react03.clock.unbindAll();

                setTimeout(function () {
                    if(!react03.correct) {
                        react03.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';

            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react03 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            react03.clock = new Clock({
                minSelector: '.react03 .analog-clock .minute-hand', 
                hrSelector: '.react03 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 1,
                spins: 7
            });

            $(react03.clock).on('dragStopped', function (e) {
                react03.evaluate();
            });  

            modal.show('Nancy se despierta a las siete<br>de la mañana.');
            $('.btn-siguiente').hide();
            react03.fx();
        }
    };

    /****************************************************************************************
     * REACT 04
     ***************************************************************************************/

    var react04 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react04.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) > 160 && Math.abs(results.minAngle) < 200 );
            var condition02 = ( Math.abs(results.hrAngle) > 200 && Math.abs(results.hrAngle) < 240 );
            var condition03 = ( Math.abs(results.spins) === 7 );

            if ( condition01 && condition02 && condition03 ) {
                
                $('.react04 .digital-clock .time span.minutes').html('30');
                $('.react04 .digital-clock .time span.hours').html('7');
                TweenMax.to( $('.react04 .bg01'), 1, {opacity:0});
                $('.react04 .digital-clock.one').hide();
                $('.react04 .digital-clock.two').show();
                
                react04.clock.unbindAll();

                setTimeout(function () {
                    if(!react04.correct) {
                        react04.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';

            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react04 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            react04.clock = new Clock({
                minSelector: '.react04 .analog-clock .minute-hand', 
                hrSelector: '.react04 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 90,
                spins: 7
            });

            $(react04.clock).on('dragStopped', function (e) {
                react04.evaluate();
            });  

            modal.show('A las siete con quince minutos, o siete y cuarto, se mete a bañar.');
            $('.btn-siguiente').hide();
            react04.fx();
        }
    };

    /****************************************************************************************
     * REACT 05
     ***************************************************************************************/

    var react05 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react05.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) === 0 || Math.abs(results.minAngle) === 360 );
            var condition02 = ( Math.abs(results.minAngle) > 340 && Math.abs(results.minAngle) < 360 );
            var condition03 = ( Math.abs(results.minAngle) > 0 && Math.abs(results.minAngle) < 20 );

            var condition04 = ( Math.abs(results.hrAngle) > 220 && Math.abs(results.hrAngle) < 260 );
            var condition05 = ( Math.abs(results.spins) >= 7 && Math.abs(results.spins) <= 8 );

            if ( ( condition01 || condition02 || condition03 ) && condition04 && condition05 ) {
                
                TweenMax.to( $('.react05 .analog-clock'), 1, {scale:0.70, x:-220, y: -25});
                $('.react05 .digital-clock .time span.minutes').html('00');
                $('.react05 .digital-clock .time span.hours').html('8');
                TweenMax.to( $('.react05 .bg01'), 1, {opacity:0});
                $('.react05 .digital-clock.one').hide();
                $('.react05 .digital-clock.two').show();
                
                react05.clock.unbindAll();

                setTimeout(function () {
                    if(!react05.correct) {
                        react05.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';

            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react05 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            react05.clock = new Clock({
                minSelector: '.react05 .analog-clock .minute-hand', 
                hrSelector: '.react05 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 180,
                spins: 7
            });

            $(react05.clock).on('dragStopped', function (e) {
                react05.evaluate();
            });  

            modal.show('A las siete con treinta minutos,<br>o siete y media, desayuna.');
            $('.btn-siguiente').hide();
            react05.fx();
        }
    };

    /****************************************************************************************
     * REACT 06
     ***************************************************************************************/

    var react06 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react06.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) > 280 && Math.abs(results.minAngle) < 320 );
            var condition02 = ( Math.abs(results.hrAngle) > 240 && Math.abs(results.hrAngle) < 280 );
            var condition03 = ( Math.abs(results.spins) === 8 );

            if ( condition01 && condition02 && condition03 ) {
                

                TweenMax.to( $('.react06 .analog-clock'), 1, {scale:1, x:295, y:45});
                $('.react06 .digital-clock .time span.minutes').html('50');
                $('.react06 .digital-clock .time span.hours').html('8');
                TweenMax.to( $('.react06 .bg01'), 1, {opacity:0});
                $('.react06 .digital-clock.one').hide();
                $('.react06 .digital-clock.two').show();
                
                react06.clock.unbindAll();

                setTimeout(function () {
                    if(!react06.correct) {
                        react06.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';
            
            
            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react06 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            TweenMax.set( $('.react06 .analog-clock'), {scale:0.70});
            
            react06.clock = new Clock({
                minSelector: '.react06 .analog-clock .minute-hand', 
                hrSelector: '.react06 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 2,
                minStep: 20,
                spins: 8
            });

            $(react06.clock).on('dragStopped', function (e) {
                react06.evaluate();
            });  

            modal.show('Nancy entra a la escuela a las ocho en punto.');
            $('.btn-siguiente').hide();
            react06.fx();
        }
    };

    /****************************************************************************************
     * REACT 07
     ***************************************************************************************/

    var react07 = {

        clock: null,
        correct: false,

        evaluate: function () {

            var results = react07.clock.getResults();
            
            var condition01 = ( Math.abs(results.minAngle) > 100 && Math.abs(results.minAngle) < 140 );
            var condition02 = ( Math.abs(results.hrAngle) > 320 && Math.abs(results.hrAngle) < 360 );
            var condition03 = ( Math.abs(results.spins) === 11 );
            
            if ( condition01 && condition02 && condition03 ) {
                
                TweenMax.to( $('.react07 .analog-clock'), 1, {scale:0.70, x:-80, y:-30});
                $('.react07 .digital-clock .time span.minutes').html('20');
                $('.react07 .digital-clock .time span.hours').html('11');
                $('.react07 .digital-clock.one').hide();
                $('.react07 .digital-clock.two').show();
                TweenMax.to( $('.react07 .bg01'), 1, {opacity:0});
                
                react07.clock.unbindAll();

                setTimeout(function () {
                    if(!react07.correct) {
                        react07.correct = true;
                        ejercicio.pageControl.showNext();
                    }
                }, 1000);
            }
        },

        fx: function () {
            
            var color = '#FFFFFF';
            
            
            setInterval( function () {
                if ( color === '#FFFFFF' ) { color = '#000000'; }
                else { color = '#FFFFFF'; }
                $('.react07 .digital-clock .time span.divider').css('color', color);
            }, 500);
        },

        init: function () {

            react07.clock = new Clock({
                minSelector: '.react07 .analog-clock .minute-hand', 
                hrSelector: '.react07 .analog-clock .hour-hand',
                evaluate: true,
                minAngle: 300,
                spins: 8
            });

            $(react07.clock).on('dragStopped', function (e) {
                react07.evaluate();
            });  

            modal.show('A las ocho con cincuenta minutos,<br>o diez para las nueve, toma clase<br>de Matemáticas.');
            $('.btn-siguiente').hide();
            react07.fx();
        }
    };

    /****************************************************************************************
     * REACT 08
     ***************************************************************************************/

    var react08 = {

        modalActions: function () {

            var first_time = true;

            $('.modal .close-modal').on('click', function () {

                setTimeout( function () {

                    $('.modal .close-modal').off('click');
                    
                    $('.modal .close-modal').on('click', function () {

                        modal.hide();
                        $('.btn-siguiente').show();
                    });
                    
                    modal.show('¿Crees que es importante establecer horarios durante el día?,<br>¿por qué?');

                }, 1000);
            });
        },

        fx: function () {

            var propeller01 = new Propeller('.react08 .analog-clock .minute-hand', {
                angle: 120,
            });
            
            var propeller02 = new Propeller('.react08 .analog-clock .hour-hand', {

                angle: 320
            });

            propeller01.unbind();
            propeller02.unbind();

            TweenMax.set( $('.react08 .analog-clock'), {scale:0.70, x:-60, y:-30});
        },

        init: function () { 
            $('.btn-siguiente').hide();
            modal.show('A las once con veinte minutos está<br>en el gimnasio de la escuela.');
            react08.modalActions();    
            react08.fx();    
        }
    };

    /****************************************************************************************
     * REACT 09
     ***************************************************************************************/

    var cuckoo = new buzz.sound( "./audio/cuckoo", {
        formats: ["mp3"]
    });

    var knock = new buzz.sound( "./audio/knock", {
        formats: ["mp3"]
    });

    var alarm = new buzz.sound( "./audio/alarm", {
        formats: ["mp3"]
    });

    var nice = new buzz.sound( "./audio/nice", {
        formats: ["mp3"]
    });

    var react09 = {

        config: {
            R1: {
                msg: '¡Correcto! Los relojes marcan<br>las tres con cuarenta y cinco minutos.',
                angle_hours: 90, 
                time:'03:45',
                minutes: '45',
                hour: '03'
            },
            R2: {
                msg: '¡Bien! Los relojes marcan<br>las siete con cincuenta minutos.',
                angle_hours: 210,   
                time:'07:50',
                minutes: '50',               
                hour: '07'
            },
            R3: {
                msg: '¡Sigue así! Los relojes marcan<br>la una con diez minutos.',
                angle_hours: 30,   
                time:'01:10',
                minutes: '10',
                hour: '01'
            },
            R4: {
                msg: '¡Excelente! Los relojes marcan<br>las nueve con treinta minutos.',
                angle_hours: 270,   
                time:'09:30',
                minutes: '30',
                hour: '09'
            },
            R5: {
                msg: '¡Muy bien! Los relojes marcan<br>las cuatro con veinte minutos.',
                angle_hours: 120,   
                time:'04:20',
                minutes: '20',
                hour: '04'
            }
        },

        clock: null,

        intentos: 0,

        active_react: null,

        active_position: null,

        corrida: [0,1,2,3,4],

        playR01: function () {

            $('.react09 .digital-clock .hours').html(react09.config.R1.hour);
            $('.react09 .digital-clock .minutes').html(react09.config.R1.minutes);

            react09.active_react = 1;
        },

        playR02: function () {

            react09.clock.resetHands();

            $('.react09 .digital-clock .hours').html(react09.config.R2.hour);
            $('.react09 .digital-clock .minutes').html(react09.config.R2.minutes);

            react09.active_react = 2;
        },

        playR03: function () {

            react09.clock.resetHands();

            $('.react09 .digital-clock .hours').html(react09.config.R3.hour);
            $('.react09 .digital-clock .minutes').html(react09.config.R3.minutes);

            react09.active_react = 3;
        },

        playR04: function () {

            react09.clock.resetHands();

            $('.react09 .digital-clock .hours').html(react09.config.R4.hour);
            $('.react09 .digital-clock .minutes').html(react09.config.R4.minutes);

            react09.active_react = 4;
        },

        playR05: function () {

            react09.clock.resetHands();

            $('.react09 .digital-clock .hours').html(react09.config.R5.hour);
            $('.react09 .digital-clock .minutes').html(react09.config.R5.minutes);

            react09.active_react = 5;
        },

        evaluate: function () {

            buzz.all().stop();

            switch ( react09.active_react ) {
                case 1:

                    var results = react09.clock.getResults();
        
                    var condition01 = ( Math.abs(results.minAngle % 360) > 250 && Math.abs(results.minAngle % 360) < 290 );
                    var condition02 = ( Math.abs(results.hrAngle % 360) > 90 && Math.abs(results.hrAngle % 360) < 130 );
                    var condition03 = ( Math.abs(results.spins) === 3 );

                    if( condition01 && condition02 && condition03 ) { 

                        $('.react09 .analog-clock .bg').animateSprite('play', 'abre');

                        cuckoo.play();

                        cuckoo.bindOnce('ended', function () {
                            modal.show(react09.config.R1.msg);
                            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');
                
                            react09.playR02();
                        });

                    } else { modal.show('Vuelve a intentarlo.'); }

                    break;
                case 2:

                    var results = react09.clock.getResults();
                    
                    var condition01 = ( Math.abs(results.minAngle % 360) > 280 && Math.abs(results.minAngle % 360) < 320 );
                    var condition02 = ( Math.abs(results.hrAngle % 360) > 210 && Math.abs(results.hrAngle % 360) < 250 );
                    var condition03 = ( Math.abs(results.spins) === 7 );

                    if( condition01 && condition02 && condition03 ) { 

                        $('.react09 .analog-clock .bg').animateSprite('play', 'abre');

                        cuckoo.play();

                        cuckoo.bindOnce('ended', function () {
                            modal.show(react09.config.R2.msg);
                            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');
                
                            react09.playR03();
                        });

                    } else { 
                        modal.show('Vuelve a intentarlo.');
                    }
                
                    break;
                case 3:

                    var results = react09.clock.getResults();

                    var condition01 = ( Math.abs(results.minAngle % 360) > 40 && Math.abs(results.minAngle % 360) < 90 );
                    var condition02 = ( Math.abs(results.hrAngle % 360) > 20 && Math.abs(results.hrAngle % 360) < 60 );
                    var condition03 = ( Math.abs(results.spins) === 1 );

                    if( condition01 && condition02 && condition03 ) { 

                        $('.react09 .analog-clock .bg').animateSprite('play', 'abre');

                        cuckoo.play();

                        cuckoo.bindOnce('ended', function () {
                            modal.show(react09.config.R3.msg);
                            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');

                            react09.playR04();
                        });

                    } else { 
                        modal.show('Vuelve a intentarlo.');
                    }

                    break;
                case 4:

                    var results = react09.clock.getResults();

                    var condition01 = ( Math.abs(results.minAngle) > 160 && Math.abs(results.minAngle) < 200 );
                    var condition02 = ( Math.abs(results.hrAngle) > 260 && Math.abs(results.hrAngle) < 300 );
                    var condition03 = ( Math.abs(results.spins) === -3 || Math.abs(results.spins) === 9 );

                    if( condition01 && condition02 && condition03 ) {

                        $('.react09 .analog-clock .bg').animateSprite('play', 'abre');

                        cuckoo.play();

                        cuckoo.bindOnce('ended', function () {
                            modal.show(react09.config.R4.msg);
                            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');

                            react09.playR05();
                        });

                    } else { 
                        modal.show('Vuelve a intentarlo.');
                    }

                    break;

                case 5:

                    var results = react09.clock.getResults();

                    var condition01 = ( Math.abs(results.minAngle) > 100 && Math.abs(results.minAngle) < 140 );
                    var condition02 = ( Math.abs(results.hrAngle) > 110 && Math.abs(results.hrAngle) < 150 );
                    var condition03 = ( Math.abs(results.spins) === -8 || Math.abs(results.spins) === 4 );

                    if( condition01 && condition02 && condition03 ) {

                        $('.react09 .analog-clock .bg').animateSprite('play', 'abre');

                        cuckoo.play();

                        cuckoo.bindOnce('ended', function () {
                            modal.show(react09.config.R5.msg);
                            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');

                            $('.react09 .sensible').off(); 
                            $('.btn-siguiente').show(); 
                        });
                    } else { 
                        modal.show('Vuelve a intentarlo.');
                    }

                    break;
                default:
                    break;                                                                             
            }
        },

        bindEvents: function () {

            $('.react09 .sensible').on('click', function () {

                buzz.all().stop();
                knock.play();
                knock.bindOnce('ended', function () { react09.evaluate(); });
            });
        },

        fx: function () {

            var clock_color = '#FFFFFF';
            $('.react09 .analog-clock .bg').animateSprite({
                fps: 6,
                loop: true,
                columns: 8,
                animations: { 
                    pendulo: [27],
                    abre: [27,19,11,3,42,26,18,10,2,41,33,25,17,9,1,40,32,24,16,8,0]
                }
            });

            $('.react09 .analog-clock .bg').animateSprite('play', 'pendulo');

            TweenMax.set($('.react09 .pendulo'), {rotation: -45});

            var penduloTL = new TimelineMax();

            penduloTL.yoyo(true).repeat(-1);
            penduloTL.to($('.react09 .pendulo'), 2, {rotation: 45, ease:Linear.easeNone});
            penduloTL.to($('.react09 .pendulo'), 2, {rotation: -45, ease:Linear.easeNone});
            penduloTL.play();

            setInterval( function () {

                if ( clock_color === '#FFFFFF' ) { clock_color = '#09252C'; }
                else { clock_color = '#FFFFFF'; }

                $('.react09 .digital-clock .time span.divider').css('color', clock_color);

            }, 500);

        },

        init: function () {

            $('.modal .close-modal').off('click');
            
            $('.modal .close-modal').on('click', function () { modal.hide(); });

            react09.clock = new Clock({
                minSelector: '.react09 .analog-clock .minute-hand', 
                hrSelector: '.react09 .analog-clock .hour-hand',
                evaluate: false,
                minAngle: 10,
                spins: 0
            });

            react09.fx();
            react09.bindEvents();
            react09.playR01();

            $('.btn-siguiente').hide();
        }
    };

    /****************************************************************************************
     * REACT 10
     ***************************************************************************************/

    var react10 = {

        config: {
            R1: {
                msg: '¡Muy bien! Los relojes marcan<br>las once con cuarenta y cinco minutos.', 
                angle_hours: 350,
                angle_mins: 270,
                minutes: '00',
                hour: '11'
            },
            R2: {
                msg: '¡Excelente! Los relojes marcan<br>las dos con quince minutos.',   
                angle_hours: 70,
                angle_mins: 90,
                minutes: '00',               
                hour: '02'
            },
            R3: {
                msg: '¡Correcto! Los relojes marcan<br>las diez con veinticinco minutos.',   
                angle_hours: 320,
                angle_mins: 150,
                minutes: '00',
                hour: '10'
            },
            R4: {
                msg: '¡Sigue así! Los relojes marcan<br>las ocho con treinta minutos.',   
                angle_hours: 255,
                angle_mins: 180,
                minutes: '00',
                hour: '08'
            },
            R5: {
                msg: '¡Bien! Los relojes marcan<br>las cinco con cinco minutos.',   
                angle_hours: 150,
                angle_mins: 30,
                minutes: '00',
                hour: '05'
            }
        },

        intentos: 0,

        active_react: null,

        active_position: null,

        current_minutes: null,

        corrida: [0,1,2,3,4],

        playR01: function () {

            react10.bindEvents();
            
            $('.react10 .digital-clock .hours').html(react10.config.R1.hour);
            $('.react10 .digital-clock .minutes').html(react10.config.R1.minutes);

            $('.react10 .analog-clock .hour-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R1.angle_hours + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R1.angle_hours + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R1.angle_hours + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R1.angle_hours + 'deg)',
                'transform'         : 'rotate(' + react10.config.R1.angle_hours + 'deg)'                
            });
            $('.react10 .analog-clock .minute-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R1.angle_mins + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R1.angle_mins + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R1.angle_mins + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R1.angle_mins + 'deg)',
                'transform'         : 'rotate(' + react10.config.R1.angle_mins + 'deg)'                
            });
            react10.active_react = 1;
        },

        playR02: function () {
            
            react10.bindEvents();

            $('.react10 .digital-clock .hours').html(react10.config.R2.hour);
            $('.react10 .digital-clock .minutes').html(react10.config.R2.minutes);

            $('.react10 .analog-clock .hour-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R2.angle_hours + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R2.angle_hours + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R2.angle_hours + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R2.angle_hours + 'deg)',
                'transform'         : 'rotate(' + react10.config.R2.angle_hours + 'deg)'                
            });
            $('.react10 .analog-clock .minute-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R2.angle_mins + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R2.angle_mins + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R2.angle_mins + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R2.angle_mins + 'deg)',
                'transform'         : 'rotate(' + react10.config.R2.angle_mins + 'deg)'                
            });

            react10.active_react = 2;
        },

        playR03: function () {

            react10.bindEvents();

            $('.react10 .digital-clock .hours').html(react10.config.R3.hour);
            $('.react10 .digital-clock .minutes').html(react10.config.R3.minutes);

            $('.react10 .analog-clock .hour-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R3.angle_hours + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R3.angle_hours + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R3.angle_hours + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R3.angle_hours + 'deg)',
                'transform'         : 'rotate(' + react10.config.R3.angle_hours + 'deg)'                
            });
            $('.react10 .analog-clock .minute-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R3.angle_mins + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R3.angle_mins + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R3.angle_mins + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R3.angle_mins + 'deg)',
                'transform'         : 'rotate(' + react10.config.R3.angle_mins + 'deg)'                
            });

            react10.active_react = 3;
        },

        playR04: function () {

            react10.bindEvents();

            $('.react10 .digital-clock .hours').html(react10.config.R4.hour);
            $('.react10 .digital-clock .minutes').html(react10.config.R4.minutes);

            $('.react10 .analog-clock .hour-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R4.angle_hours + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R4.angle_hours + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R4.angle_hours + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R4.angle_hours + 'deg)',
                'transform'         : 'rotate(' + react10.config.R4.angle_hours + 'deg)'                
            });
            $('.react10 .analog-clock .minute-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R4.angle_mins + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R4.angle_mins + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R4.angle_mins + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R4.angle_mins + 'deg)',
                'transform'         : 'rotate(' + react10.config.R4.angle_mins + 'deg)'                
            });

            react10.active_react = 4;
        },

        playR05: function () {

            react10.bindEvents();

            $('.react10 .digital-clock .hours').html(react10.config.R5.hour);
            $('.react10 .digital-clock .minutes').html(react10.config.R5.minutes);

            $('.react10 .analog-clock .hour-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R5.angle_hours + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R5.angle_hours + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R5.angle_hours + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R5.angle_hours + 'deg)',
                'transform'         : 'rotate(' + react10.config.R5.angle_hours + 'deg)'                
            });
            $('.react10 .analog-clock .minute-hand').css({
                '-webkit-transform' : 'rotate(' + react10.config.R5.angle_mins + 'deg)',
                '-moz-transform'    : 'rotate(' + react10.config.R5.angle_mins + 'deg)',
                '-ms-transform'     : 'rotate(' + react10.config.R5.angle_mins + 'deg)',
                '-o-transform'      : 'rotate(' + react10.config.R5.angle_mins + 'deg)',
                'transform'         : 'rotate(' + react10.config.R5.angle_mins + 'deg)'                
            });

            react10.active_react = 5;
        },

        evaluate: function () {

            react10.unbindEvents();

            switch ( react10.active_react ) {
                case 1:

                    if( react10.current_minutes === 45 ) {

                        nice.play();

                        nice.bindOnce('ended', function () {
                            modal.show(react10.config.R1.msg);
                            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            react10.playR02();
                        });
                    }
                    else { 

                        alarm.play();
                        alarm.bindOnce('ended', function () {
                            react10.bindEvents();
                            modal.show('Vuelve a intentarlo.')
                        });
                    }    

                    break;
                case 2:

                    if( react10.current_minutes === 15 ) {

                        nice.play();

                        nice.bindOnce('ended', function () {
                            modal.show(react10.config.R2.msg);
                            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            react10.playR03();
                        });
                    }
                    else { 

                        alarm.play();
                        alarm.bindOnce('ended', function () {
                            react10.bindEvents();
                            modal.show('Vuelve a intentarlo.')
                        });
                    }    

                    break;
                case 3:

                    if( react10.current_minutes === 25 ) {

                        nice.play();

                        nice.bindOnce('ended', function () {
                            modal.show(react10.config.R3.msg);
                            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            react10.playR04();
                        });
                    }
                    else { 

                        alarm.play();
                        alarm.bindOnce('ended', function () {
                            react10.bindEvents();
                            modal.show('Vuelve a intentarlo.')
                        });
                    }    

                    break;
                case 4:

                    if( react10.current_minutes === 30 ) {

                        nice.play();

                        nice.bindOnce('ended', function () {
                            modal.show(react10.config.R4.msg);
                            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            react10.playR05();
                        });
                    }
                    else { 

                        alarm.play();
                        alarm.bindOnce('ended', function () {
                            react10.bindEvents();
                            modal.show('Vuelve a intentarlo.')
                        });
                    }    

                    break;
                case 5:

                    if( react10.current_minutes === 5 ) {
				  
		
		

                        nice.play();

                        nice.bindOnce('ended', function () {
					$('#retrofin').fadeIn('fast');
					$('.close-modal').fadeOut('fast');
                            modal.show(react10.config.R5.msg);
                            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            react10.playR05();
                        });
                    }
                    else { 
                        alarm.play();
                        alarm.bindOnce('ended', function () {
                            react10.bindEvents();
                            modal.show('Vuelve a intentarlo.')
                        });
                    }    
			  
			  $('#retrofin').on('click touchstart',function(){
				  $('#retrofin').fadeout('fast');
		 $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');
                            modal.show('¡Muy bien! Has finalizado la actividad. En tu cuaderno, elabora un horario con las actividades que realizas durante el día.');
                            $('.modal .close-modal').hide();
                            $('.react10 .sensible').off(); 
                            $('.react10 .down').off(); 
                            $('.react10 .up').off(); 
                        });

                    break;                                                                                
            }
        },

        bindEvents: function () {

            var pad = function (n, width, z) {
                z = z || '0';
                n = n + '';
                return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
            }

            $('.react10 .up').on('click', function () {

                var minutes = parseInt( $('.react10 .digital-clock .minutes').html() );

                if (minutes === 59) { minutes = 0; } else {
                    minutes += 1;
                }

                react10.current_minutes = minutes;

                if( minutes >= 0 && minutes <= 9) {
                    $('.react10 .digital-clock .minutes').html(pad(minutes,2));                
                } else {
                    $('.react10 .digital-clock .minutes').html(minutes);                
                }
            });

            $('.react10 .down').on('click', function () {

                var minutes = parseInt( $('.react10 .digital-clock .minutes').html() );

                minutes -= 1;

                if (minutes < 0) { minutes = 59; }

                react10.current_minutes = minutes;

                if( minutes >= 0 && minutes <= 9) {
                    $('.react10 .digital-clock .minutes').html(pad(minutes,2));                
                } else {
                    $('.react10 .digital-clock .minutes').html(minutes);                
                }             
            });

            $('.react10 .sensible').on('click', function () {
                react10.evaluate();
            });
        },

        unbindEvents: function () {

            $('.react10 .up').off();

            $('.react10 .down').off();

            $('.react10 .sensible').off();
        },

        fx: function () {

            var clock_color = '#FFFFFF';

            $('.react10 .analog-clock .bg').animateSprite({
                fps: 6,
                loop: true,
                columns: 8,
                animations: { 
                    pendulo: [27],
                    abre: [27,19,11,3,42,26,18,10,2,41,33,25,17,9,1,40,32,24,16,8,0]
                }
            });

            $('.react10 .analog-clock .bg').animateSprite('play', 'pendulo');

            TweenMax.set($('.react10 .pendulo'), {rotation: -45});

            var penduloTL = new TimelineMax();

            penduloTL.yoyo(true).repeat(-1);
            penduloTL.to($('.react10 .pendulo'), 2, {rotation: 45, ease:Linear.easeNone});
            penduloTL.to($('.react10 .pendulo'), 2, {rotation: -45, ease:Linear.easeNone});
            penduloTL.play();

            setInterval( function () {

                if ( clock_color === '#FFFFFF' ) { clock_color = '#09252C'; }
                else { clock_color = '#FFFFFF'; }

                $('.react10 .digital-clock .time span.divider').css('color', clock_color);

            }, 500);

        },

        init: function () {

            react10.fx();
            react10.playR01();
            $('.btn-siguiente').hide();
        }
    };

    var indicador01 = {
        
        init: function () {

            $(document).ready(function () {

                $('.indicador01').each(function () {
                    
                    $(this).animateSprite({
                        fps: 8,
                        columns: 4,
                        loop: true,
                        animations: { brillo: [11,7,3,18,14,10,6,2,15,13,9,5,1,16,12,8,4,0] }                
                    });

                    $(this).animateSprite('play', 'brillo');                
                });                  
            });
        }
    };

    pc = ejercicio.pageControl;

    indicador01.init();
    pc.init();

//})(jQuery, window);