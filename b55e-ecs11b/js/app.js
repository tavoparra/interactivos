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
                    pInitCallback : function () { react10.init(); }
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
      init: function () {

        $(".actividad").on('click', '.lugar-activo', function() {
            origen = mapHelper.ubicacion;
            destino = $(this).attr('id');
            mapHelper.trasladarse(origen, destino);
        });

        // añadimos la función de desbloquear los escenarios
        $(".b-unlock").click(function(){
            $(".cursor-locked").removeClass("cursor-locked").addClass("lugar-activo");
        });

        // Música de fondo
        Helper.playBackgroundAudio('react01-open.mp3');
	  }
    };

    /****************************************************************************************
     * REACT 02
     ***************************************************************************************/

    var react02 = {
		init: function () {
            $("[class^=llamita0]").hide();
            $(".pulsa_fantasma").hide();
			$(".b-espada").unbind("click");
			$(".b-espada").unbind("click");
            Helper.playBackgroundAudio('react02-03-04-back.mp3');
            Helper.playAudio("react02-instruccion.mp3", "react02.mostrarAleatorio();");
            react02.shuffle();
		},
        timer: null,
        mostrarAleatorio: function mostrarAleatorio() {
            var actual = react02.restantes.shift(); 
			$(".close-modal").unbind("click", react02.mostrarAleatorio);

            $(".fantasma0" + actual.indice).show();

            if (actual.literal === true) {
                $(".b-espada").click(function() {react02.acertar(actual);});
                $(".b-estrella").click(function() {react02.fallar(actual);});
            } else {
                $(".b-espada").click(function() {react02.fallar(actual);});
                $(".b-estrella").click(function() {react02.acertar(actual);});
            }

            react02.timer = setTimeout(function (){
                $(".b-espada").unbind("click");
                $(".b-estrella").unbind("click");
                Helper.playAudio("mal.mp3");
                react02.errores++; 
               if (react02.errores < 3) {
                 $(".llamita0" + react02.errores).show();
                 react02.restantes.push(actual);
                 $(".pulsa_fantasma").hide();
                 react02.mostrarAleatorio();
                 react02.restantes.push(actual);
               } else {
                 react02.perderReactivo();
               }

            }, 10000);
        },
        acertar: function (actual) {
            if (react02.timer !== null) {
               clearTimeout(react02.timer);
               react02.timer = null;
            }

			$(".b-espada").unbind("click");
			$(".b-estrella").unbind("click");
            Helper.playAudio("bien.mp3");
            modal.show(this.retros[actual.indice].positiva);
			if (react02.restantes.length == 0) {
				$(".close-modal").click(react02.regresarMapa);
			} else {
                $(".pulsa_fantasma").hide();
				$(".close-modal").click(react02.mostrarAleatorio);
            }
        },
        fallar: function (actual) {
            if (react02.timer !== null) {
               clearTimeout(react02.timer);
               react02.timer = null;
            }
			$(".b-espada").unbind("click");
			$(".b-estrella").unbind("click");
            Helper.playAudio("mal.mp3");
            modal.show(this.retros[actual.indice].negativa);
            this.errores++; 
           if (this.errores < 3) {
             $(".llamita0" + this.errores).show();
             react02.restantes.push(actual);
             $(".pulsa_fantasma").hide();
		 	 $(".close-modal").click(react02.mostrarAleatorio);
           } else {
               $(".close-modal").click(react02.perderReactivo);
           }
        },
        perderReactivo: function perderReactivo() {
            if (react02.timer !== null) {
               clearTimeout(react02.timer);
               react02.timer = null;
            }
            $(".close-modal").unbind("click", react02.perderReactivo);
			$(".react02-samurai").animateSprite({
                fps: 2,
                animations: {
                    walkRight: [0, 1, 2, 3, 4]
                },
                loop: false,
                complete: function () {
                    $(".react02-samurai").animateSprite('frame', 0);
                     react02.errores = 0;
                     react02.restantes = [
                       {"indice": 1, "literal": true },
                       {"indice": 2, "literal": false },
                       {"indice": 3, "literal": true },
                       {"indice": 4, "literal": true },
                       {"indice": 5, "literal": false },
                       {"indice": 6, "literal": false }
                    ];
                    react02.shuffle();
                    react02.init();
                }
            });
            $(".react02-samurai").animateSprite('play', 'walkRight');
        },
        regresarMapa: function regresarMapa() {
            Helper.finalizarReactivo("bosque"); 
            $(".close-modal").unbind("click", react02.regresarMapa);
        },
        errores: 0,
        restantes: [
           {"indice": 1, "literal": true },
           {"indice": 2, "literal": false },
           {"indice": 3, "literal": true },
           {"indice": 4, "literal": true },
           {"indice": 5, "literal": false },
           {"indice": 6, "literal": false }
        ],
        retros: {
            1: {"positiva": "¡Muy bien!, las palabras tienen un sentido literal.", "negativa": "Aunque Ricitos de Oro es un apodo, los versos sólo están describiendo una situación"},
            2: {"positiva": "¡Eres poesía pura!, por supuesto, es sentido figurado.", "negativa": "Los versos no se refieren a un caballo de verdad. Prueba otra vez."},
            3: {"positiva": "¡Estupendo!, se refiere literalmente a un animal.", "negativa": "El caballo tiene un significado real en este poema."},
            4: {"positiva": "!Excelente!, el poeta sólo describe una situación.", "negativa": "No hay ningún significado adicional en estos versos."},
            5: {"positiva": "¡Muy bien!, el poeta le da un sentido figurado a las palabras.", "negativa": "Los hombres que dan frutos no existen."},
            6: {"positiva": "¡Tú sí sabes!, el poeta habla de la luna como si ésta fuera una araña.", "negativa": "La luna es un astro y aquí el poeta le da otro significado."},
        },
        shuffle: function () {
            var currentIndex = this.restantes.length, temporaryValue, randomIndex;

			  // mientras aún halla elementos
			  while (0 !== currentIndex) {

				// Escoger otro elemento
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// Y cambiarlo con el actual
				temporaryValue = this.restantes[currentIndex];
				this.restantes[currentIndex] = this.restantes[randomIndex];
				this.restantes[randomIndex] = temporaryValue;
			  }
        }

    };

    /****************************************************************************************
     * REACT 03
     ***************************************************************************************/

    var react03 = {
		init: function () {
            Helper.stopBackgroundAudio();
            Helper.playBackgroundAudio("react02-03-04-back.mp3");
            Helper.playAudio("react03-instruccion.mp3", "react03.mostrarPoema();");
            react03.shuffle();
            $("[class^=llamita0]").hide();
            $(".monstruo01,.monstruo02,#globo").hide();

            $(".b-maestro").click(function() {
                Helper.playAudio("react03-instruccion.mp3");
            });

            $("#btn-audio").click(function() {
                if (react03.actual !== null) {
                    Helper.playAudio("react03-poema0" + react03.actual + ".mp3");
                }
            });

            $(".botones:not(#btn-audio)").click(function(){
                if (react03.actual !== null) {
                    var emocion = $(this).attr("id").substring(4);

                    modal.show(react03.retros[react03.actual][emocion]);

                    if (emocion == react03.poemas[react03.actual].emocion) {
                        Helper.playAudio("bien.mp3");

                       if(react03.restantes.length > 0) {
                            $(".close-modal").click(react03.mostrarPoema);
                       } else {
                            $(".close-modal").click(react03.regresarMapa);
                       }
                    } else {
                        Helper.playAudio("mal.mp3");
                        react03.restantes.push(react03.actual);
                        react03.errores++;
                        $(".llamita0" + react03.errores).show();
                        
                        if (react03.errores == 2) {
                            $(".close-modal").click(react03.perder);

                        } else {
                            $(".close-modal").click(react03.mostrarPoema);
                        }
                    }
                }
            });
		},
        regresarMapa: function regresarMapa() {
            Helper.finalizarReactivo("cueva"); 
            $(".close-modal").unbind("click", react03.regresarMapa);
        },
        perder: function perder() {
            react03.errores = 0;
            react03.restantes = [1,2,3,4,5];
            $(".close-modal").unbind("click", react03.perder);
            $(".react03-samurai").animateSprite({
                fps: 2,
                animations: {
                    walkRight: [0, 1, 2, 3, 4]
                },
                loop: false,
                complete: function(){
                    $(".react03-samurai").animateSprite('frame', 0);
                    react03.init();
                }
            });
            $(".react03-samurai").animateSprite('play', 'walkRight');
        },
        errores: 0,
        actual: null,
        monstruoActual: 1,
        restantes: [1,2,3,4,5],
        mostrarPoema: function mostrarPoema() {
            $(".close-modal").unbind("click", react03.mostrarPoema);
            react03.actual = react03.restantes.shift();
            
            $(".monstruo0" + react03.monstruoActual).hide();
            react03.monstruoActual = (react03.monstruoActual == 1) ? 2 : 1;
            $(".monstruo0" + react03.monstruoActual).show();

            $("#globo p").html(react03.poemas[react03.actual].texto);
            $("#globo").show();
        },
        poemas: {
           1: {
				"texto": "Dos niños, ramas de un mismo árbol de miseria,<br/>,juntos en un portal bajo la noche calurosa,<br/>dos niños pordioseros llenos de pústulas,<br/>comen de un mismo plato como perros hambrientos […]<br/>Nicolás Guillen",
				"emocion": "tristeza"
			},
           2: {
				"texto": "Estando una mañana haciendo el bobo<br/>le entró un hambre espantosa al Señor Lobo,<br/>así que, para echarle algo a la muela,<br/>se fue corriendo a casa de la Abuela.<br/>Roald Dahl",
				"emocion": "alegria"
			},
           3: {
				"texto": "Rasga el aire grávido de angustia un lamento escalofriante;<br/>yo no sé si es de dolor o es de ruego este lamento.<br/>Amparo Dávila",
				"emocion": "miedo"
			},
           4: {
				"texto": "Me suben las lágrimas a los ojos<br/>y se mezclan con el sabor a chocolate<br/>mi sabor a mi felicidad pasada,<br/>mi infancia ida […]<br/>Fernando Pessoa",
				"emocion": "nostalgia"
			},
           5: {
				"texto": "Para el odio escribo.<br/>Para destruirte, marco estos papeles.<br/>Exprimo el agrio humor del odio<br/>en esta tinta<br/>hago temblar la pluma.<br/>Eduardo Lizalde",
				"emocion": "enojo"
			}
        },
        retros: {
            1: {
                'tristeza': '¡Por supuesto!, qué imagen más triste evoca este poema.',
                'alegria': 'Este poema evoca otra emoción, escúchalo.',
                'enojo': 'Es una situación que puede hacer enojar, pero la emoción que evoca es otra.',
                'nostalgia': 'La nostalgia tiene que ver con los recuerdos de las personas.',
                'miedo': 'El miedo no es un sentimiento que evoque este poema.'
            },
            2: {
                'tristeza': 'Estas rimas no podrían poner triste a nadie, intenta de nuevo.',
                'alegria': '¡Qué perspicaz! Lo supiste desde la primera línea.',
                'enojo': 'En este caso, el que se enoja pierde, prueba otra opción.',
                'nostalgia': 'La nostalgia tiene que ver con los recuerdos de las personas.',
                'miedo': 'Los lobos dan miedo, pero éste no es como lo pintan.'
            },
            3: {
                'tristeza': 'Es fácil confundirse, pero no es el sentimiento que evoca este poema.',
                'alegria': 'Escucha el poema, evoca un sentimiento diferente.',
                'enojo': 'En este caso, el que se enoja pierde, prueba otra opción.',
                'nostalgia': 'La nostalgia tiene que ver con los recuerdos de las personas.',
                'miedo': '¡Qué miedo!, claro que sí, es el sentimiento que evoca este poema.'
            },
            4: {
                'tristeza': 'Estuviste cerca, el sentimiento que evoca es muy parecido.',
                'alegria': 'Escucha el poema, evoca un sentimiento diferente.',
                'enojo': 'En este caso, el que se enoja pierde, prueba otra opción.',
                'nostalgia': '!Buen golpe!, el poeta está evocando sus recuerdos de la infancia.',
                'miedo': 'El miedo no es un sentimiento que evoque este poema.'
            },
            5: {
                'tristeza': 'Estas rimas no podrían poner triste a nadie, intenta de nuevo',
                'alegria': 'Este poema evoca otra emoción, escúchalo.',
                'enojo': '¡Acertaste!, parece que el poeta estaba muy enojado.',
                'nostalgia': 'La nostalgia tiene que ver con los recuerdos de las personas.',
                'miedo': 'El miedo no es un sentimiento que evoque este poema.'
            }
        },
		shuffle: function () {
            var currentIndex = this.restantes.length, temporaryValue, randomIndex;

			  // mientras aún halla elementos
			  while (0 !== currentIndex) {

				// Escoger otro elemento
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// Y cambiarlo con el actual
				temporaryValue = this.restantes[currentIndex];
				this.restantes[currentIndex] = this.restantes[randomIndex];
				this.restantes[randomIndex] = temporaryValue;
			  }
        }

    };

    /****************************************************************************************
     * REACT 04
     ***************************************************************************************/

    var react04 = {
		init: function () {
            $("[class^=llamita0]").hide();
            Helper.stopBackgroundAudio();
            Helper.playBackgroundAudio("react02-03-04-back.mp3");
            Helper.playAudio("react04-instruccion.mp3", "react04.mostrarPoema();");
            $(".b-estrella,.b-espada").hide();
            $(".shogun,.globo,.tablero").hide();
            react04.shuffle();

            $(".b-maestro").click(function() {
                Helper.playAudio("react04-instruccion.mp3");
            });

            $(".tablero").unbind("click");
            $(".tablero").click(function() {
                if (react04.actual !== null) {
                    var respuesta = $(this).attr("data-val");

                    modal.show(react04.retros[react04.actual][respuesta]);
                    if (respuesta == react04.versos[react04.actual].opcion) {
                        Helper.playAudio("bien.mp3");
                        react04.opciones2();
                    } else {
                        Helper.playAudio("mal.mp3");
                        react04.errores++;
                        $(".llamita0" + react04.errores).show();
                        
                        if (react04.errores == 3) {
                            $(".close-modal").click(react04.perder);
                        } else {
                            react04.restantes.push(react04.actual);
                            $(".close-modal").show(react04.mostrarPoema);
                        }
                    }
                }
            });

            $(".b-estrella,.b-espada").unbind("click");
            $(".b-estrella").click(function(){
                    modal.show(react04.retros[react04.actual]["figurado"]);
                    if (react04.versos[react04.actual].tipo == "figurado") {
                        Helper.playAudio("bien.mp3");
                        if (react04.restantes.length > 0) {
                            $(".close-modal").show(react04.mostrarPoema);
                        } else {
                            $(".close-modal").show(react04.regresarMapa);
                        }
                    } else {
                        Helper.playAudio("mal.mp3");
                        react04.errores++;
                        $(".llamita0" + react04.errores).show();
                        
                        if (react04.errores == 3) {
                            $(".close-modal").click(react04.perder);
                        } else {
                            react04.restantes.push(react04.actual);
                            $(".close-modal").show(react04.mostrarPoema);
                        }
                    }
                
            });
            $(".b-espada").click(function(){
                    modal.show(react04.retros[react04.actual]["literal"]);
                    if (react04.versos[react04.actual].tipo == "literal") {
                        Helper.playAudio("bien.mp3");
                        if (react04.restantes.length > 0) {
                            $(".close-modal").show(react04.mostrarPoema);
                        } else {
                            $(".close-modal").show(react04.regresarMapa);
                        }
                    } else {
                        Helper.playAudio("mal.mp3");
                        react04.errores++;
                        $(".llamita0" + react04.errores).show();
                        
                        if (react04.errores == 3) {
                            $(".close-modal").click(react04.perder);
                        } else {
                            react04.restantes.push(react04.actual);
                            $(".close-modal").show(react04.mostrarPoema);
                        }
                    }
                
            });
		},
        perder: function perder() {
            $(".close-modal").unbind("click", react04.perder);
            $(".react04-samurai").animateSprite({
                fps: 2,
                animations: {
                    walkRight: [0, 1, 2, 3, 4]
                },
                loop: false,
                complete: function() {
                    react04.restantes = [1,2,3,4,5,6];
                    react04.errores = 0;
                    $(".react04-samurai").animateSprite('frame', 0);
                    react04.init();
                }
            });
            $(".react04-samurai").animateSprite('play', 'walkRight');
        },
        mostrarPoema: function mostrarPoema() {
            $(".close-modal").unbind("click", react04.mostrarPoema);
            react04.actual = react04.restantes.shift();

            $(".b-estrella,.b-espada").hide();
            $(".shogun").show();
            $(".globo").show();
            $(".globo p").html(react04.versos[react04.actual].verso);

            for (var i = 1; i <= 3; i++) {
                $("#tablero" + i).show();
                $("#tablero" + i + " p").html(react04.versos[react04.actual].opciones[i]);
            }

        },
        opciones2: function opciones2(){
            $(".b-estrella,.b-espada").show();
            $(".tablero").hide();
        },
        versos: {
            1: {
               "verso": "La bruja Pirulí<br/>de día no hablaba<br/>de <span class='opcion'>noche</span> sí<br/>jugaba de día</br>de noche hacía así</br>Tomás Segovia", 
               "opciones": {1: "Parte del día entre la puesta de sol y el amanecer.", 2: "Oscuridad.", 3: "Confusión o tristeza."},
               "opcion": 1,
               "tipo": "literal"
            },
            2: {
               "verso": "En mi prisa por crecer<br/>eché alas y <span class='opcion'>raíces</span><br/>¿qué voy a hacer?</br>Ulalume González de León", 
               "opciones": {1: "Causa u origen de algo.", 2: "Órgano de las plantas.", 3: "Afirmarse o arraigarse."},
               "opcion": 3,
               "tipo": "figurado"
            },
            3: {
               "verso": "Es tan duro el <span class='opcion'>corazón</span> de la piedra!<br/>Amparo Dávila", 
               "opciones": {1: "Ánimo o valor.", 2: "Sentimientos.", 3: "Centro de algo."},
               "opcion": 3,
               "tipo": "literal"
            },
            4: {
               "verso": "Madre, madre, tú me besas,<br/>pero yo te beso más,<br>y el <span class='opcion'>enjambre</span> de mis besos<br/>no te deja ni mirar...<br/>Gabriel Mistral", 
               "opciones": {1: "Multitud de abejas.", 2: "Muchedumbre de personas o animales.", 3: "Conjunto de besos."},
               "opcion": 3,
               "tipo": "figurado"
            },
            5: {
               "verso": "En el candor de mi niñez lejana,</br/>entre el <span class='opcion'>libro</span> y el juego,</br>China es un gran jarro de porcelana</br>amarilla como un dragón de fuego.<br/>Nicolás Guillén", 
               "opciones": {1: "Obra científica o literaria.", 2: "El estudio.", 3: "Conjunto de hojas de papel."},
               "opcion": 2,
               "tipo": "figurado"
            },
            6: {
               "verso": "Entre todas las rutas a mi alcance<br/>elegí siempre andarme por las <span class='opcion'>ramas</span>:<br/>gran frescura, gran vista, gran emoción […]<br/>José Emilio Pacheco", 
               "opciones": {1: "Dar rodeos sin hablar del asunto.", 2: "Parte de una ciencia.", 3: "Cada una de las partes que nacen del tallo de una planta."},
               "opcion": 1,
               "tipo": "figurado"
            }
        },
        regresarMapa: function regresarMapa() {
            Helper.finalizarReactivo("palacio"); 
            $(".close-modal").unbind("click", react04.regresarMapa);
        },
        retros: {
            1: {
                1: "¡Genial!, así es se refiere justo a eso.",
                2: "La noche es oscura, pero no es el significado que buscamos.",
                3: "La noche puede ser confusa, pero el significado es otro.",
                "figurado": "El poeta no parece estar dándole otro significado a esta palabra.",
                "literal": "¡Buen golpe!, las rimas hablan literalmente de la noche."
            },
            2: {
                1: "No parece referirse a la causa de algo.",
                2: "El poema no habla de las raíces de las plantas.",
                3: "¡Exacto!, echar raíces significa eso.",
                "figurado": "¡Muy bien!, la le da un sentido figurado a las palabras.",
                "literal": "Fíjate bien el sentido que le da a raíces."
            },
            3: {
                1: "El poema se refiere a la piedra como un ser inanimado.",
                2: "Sería raro que hablara de los sentimientos de la piedra, ¿no crees?",
                3: "¡Excelente!, está hablando del corazón o centro de la piedra.",
                "figurado": "Intenta otra vez, corazón tiene otro significado.",
                "literal": "¡Estupendo!, habla del corazón de la piedra en sentido literal."
            },
            4: {
                1: "La imagen es bonita, pero se refiere a otro significado de enjambre.",
                2: "Un enjambre de personas no es lo que significa.",
                3: "¡Qué alegoría más bella!, exacto a esto es a lo que se refiere.",
                "figurado": "¡Correcto!, el sentido figurado de las palabras les da un nuevo significado.",
                "literal": "Los enjambres de besos no existen en la realidad."
            },
            5: {
                1: "Una obra científica es un libro, pero no es al que el autor se refiere.",
                2: "¡Exacto!, cuando el autor era niño iba a la escuela y jugaba, el libro significa el estudio.",
                3: "Un conjunto de hojas no es algo que sea significativo para un niño.",
                "figurado": "¡Por supuesto!, está usando un sentido figurado.",
                "literal": "El poeta no describe una situación literal."
            },
            6: {
                1: "¡Está claro en tu mente!, el autor usa esta expresión popular con un significado distinto.",
                2: "Andarse por las ramas de la ciencia suena un poco raro, ¿no crees?",
                3: "Los únicos que andan por las ramas de los árboles son los monos, tal vez se refiera a otra cosa.",
                "figurado": "¡Buen golpe!, las expresiones populares usan también un sentido figurado.",
                "literal": "Andarse por las ramas es una expresión popular."
            }
        },
        restantes: [1,2,3,4,5,6],
        actual: null,
        errores: 0,
		shuffle: function () {
            var currentIndex = this.restantes.length, temporaryValue, randomIndex;

			  // mientras aún halla elementos
			  while (0 !== currentIndex) {

				// Escoger otro elemento
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// Y cambiarlo con el actual
				temporaryValue = this.restantes[currentIndex];
				this.restantes[currentIndex] = this.restantes[randomIndex];
				this.restantes[randomIndex] = temporaryValue;
			  }
        },
    };

    /****************************************************************************************
     * REACT 05
     ***************************************************************************************/

    var react05 = {
		init: function () {
            Helper.playBackgroundAudio("react04-back.mp3");
            $(".react05-samurai,.react05-maestro").show();
            $(".video01").hide();
            $("#cerrar-video").click(function() {
                Helper.stopBackgroundAudio();
                pc.settings.currentPage = 0;
                pc.showPage();
            });

            $("#cerrar-video").hide();
            $(".react05-maestro").click(function() {
                $(".react05-maestro").animateSprite({
                    fps: 3,
                    animations: {
                        walkRight: [0, 1, 2, 3, 4]
                    },
                    loop: false,
                    complete: function() {
                        $(".react05-samurai,.react05-maestro").fadeOut("slow", function() {
                            $(".video01").show();
                            $("#cerrar-video").show();
                        });
                    }
                });
                $(".react05-maestro").animateSprite('play', 'walkRight');
            });
		}
    };

    /****************************************************************************************
     * REACT 06
     ***************************************************************************************/

    var react06 = {
		init: function () {
            Helper.playAudio("react05-end.mp3");
            
        }
    };

    /****************************************************************************************
     * REACT 07
     ***************************************************************************************/

    var react07 = {
		init: function () {}
    };

    /****************************************************************************************
     * REACT 08
     ***************************************************************************************/

    var react08 = {
		init: function () {}
    };

    /****************************************************************************************
     * REACT 09
     ***************************************************************************************/

   var react09 = {
		init: function () {}
    };

/****************************************************************************************
 * REACT 10
 ***************************************************************************************/

var react10 = {
	init: function () {
		$('.btn-siguiente').hide();
	}
};

/****************************************************************************************
 * Helper para funciones de audio y otras funciones generales
 ***************************************************************************************/
var Helper = {
    bgAudio: document.createElement('audio'),
    playAudio(audioName, callback) {
        var $audio = $("#FlexAudio");
        $audio.attr("src", "audio/" + audioName);

        if (typeof callback != "undefined") {
            $audio.attr("onended", callback);    
        } else {
            $audio.attr("onended", "");
        }

        $audio[0].play();
    },
    stopAudio() {
        var $audio = $("#FlexAudio");
        $audio[0].pause();
    },
    playBackgroundAudio(audioName) {
        this.bgAudio.src = "audio/" + audioName; 
		if (typeof this.bgAudio.loop == 'boolean') {
			this.bgAudio.loop = true;
		}else{
			this.bgAudio.addEventListener('ended', function() {
				this.bgAudio.currentTime = 0;
				this.bgAudio.play();
			}, false);
		}
		this.bgAudio.play();
    },
    stopBackgroundAudio() {
      if(this.bgAudio && this.bgAudio.pause) {
        this.bgAudio.pause();
      }
    },
    finalizarReactivo(nombreReactivo) {
        Helper.reactivosFinalizados.push(nombreReactivo);

        if (Helper.reactivosFinalizados.length == 3) {
            Helper.stopBackgroundAudio();
            pc.settings.currentPage = 5;
            pc.showPage();
        } else {
            Helper.stopBackgroundAudio();
            pc.settings.currentPage = 0;
            pc.showPage();
            $("#" + nombreReactivo).attr('class', '');


            if (nombreReactivo === "bosque" && $("#cueva").hasClass("cursor-locked")) {
                $("#cueva").addClass("lugar-activo").removeClass("cursor-locked");
            }
            if (nombreReactivo === "cueva" && $("#palacio").hasClass("cursor-locked")) {
                $("#palacio").addClass("lugar-activo").removeClass("cursor-locked");
            }
        }
    },
    reactivosFinalizados: []
};

/****************************************************************************************
 * Helper para los traslados del mapa
 ***************************************************************************************/
var mapHelper = {
    trasladandose: false,
    ubicacion: 'inicio', // Ubicación inicial
    destino: null,
    trasladarse(origen, destino) {
        if (!this.trasladandose) {
		  $(".personajesmapa").animateSprite({
			fps: 6,
			animations: {
				walkRight: [0, 1, 2, 3, 4, 5, 6, 7],
				walkLeft: [15, 14, 13, 12, 11, 10, 9, 8]
			},
			loop: true
		});
            this.destino = destino;
            this.trasladandose = true;
            trayecto = origen + "-" + destino;

            switch(trayecto) {
                case 'inicio-bosque':
                  this.coordenadas = [[325,266]];
                  break;
                case 'inicio-cueva':
                  this.coordenadas = [[500,266],[500,230]];
                  break;
                case 'inicio-palacio':
                  this.coordenadas = [[500,266],[500,150],[400,150]];
                  break;
                case 'inicio-montana':
                  this.coordenadas = [[500,266],[500,150],[280,150],[279,75]];
                  break;

                case 'bosque-cueva':
                  this.coordenadas = [[500,266],[500,230]];
                  break;
                case 'bosque-palacio':
                  this.coordenadas = [[500,266],[500,150],[400,150]];
                  break;
                case 'bosque-montana':
                  this.coordenadas = [[500,266],[500,150],[280,150],[279,75]];
                  break;
                case 'cueva-bosque':
                  this.coordenadas = [[500,266],[325,266]];
                  break;
                case 'cueva-palacio':
                  this.coordenadas = [[500,150],[400,150]];
                  break;
                case 'cueva-montana':
                  this.coordenadas = [[500,150],[280,150],[279,75]];
                  break;

                case 'palacio-bosque':
                  this.coordenadas = [[500,150],[500,266],[325,266]];
                  break;
                case 'palacio-cueva':
                  this.coordenadas = [[500,150],[500,230]];
                  break;
                case 'palacio-montana':
                  this.coordenadas = [[280,150],[279,75]];
                  break;

                case 'montana-bosque':
                  this.coordenadas = [[280,150],[500,150],[500,266],[325,266]];
                  break;
                case 'montana-cueva':
                  this.coordenadas = [[280,150],[500,150],[500,230]];
                  break;
                case 'montana-palacio':
                  this.coordenadas = [[280,150],[400,150]];
                  break;
            }

            this.realizarTrayecto();
        } 
    },
    realizarTrayecto() {
       var nextCoord = this.coordenadas.shift(); 

       if (typeof nextCoord !== 'undefined') {
         var direction = "walkLeft";
         // Si aun hay coordenadas a donde trasladarse aplicamos la animación y mandamos esta misma función como callback
         if (nextCoord[0] >= $(".personajesmapa").position().left) {
            direction = "walkRight";
         }

		 $(".personajesmapa").animateSprite('play', direction);
         $(".personajesmapa").animate({left: nextCoord[0] + "px", top: nextCoord[1] + "px"}, 1200, 'linear', this.realizarTrayecto.bind(this));
       } else {
         // Si ya no hay coordenadas pendientes detenemos la animación y música de fondo y mandamos al reactivo
         $(".personajesmapa").animateSprite('stop');
         $(".personajesmapa").animateSprite('frame', 1);
         this.ubicacion = this.destino;
         this.destino = null;
         this.trasladandose = false;
         Helper.stopBackgroundAudio();
         pc.settings.currentPage = this.ubicaciones[this.ubicacion];
         pc.showPage();
       }
    },
    coordenadas: [],
    ubicaciones: {
        'bosque': 1,
        'cueva': 2,
        'palacio': 3,
        'montana': 4
    }
};
/****************************************************************************************
     
     ***************************************************************************************/
var indicador01 = {

	init: function () {

		$(document).ready(function () {

			$('.indicador01').each(function () {

				$(this).animateSprite({
					fps: 8,
					columns: 4,
					loop: true,
					animations: {
						brillo: [11, 7, 3, 18, 14, 10, 6, 2, 15, 13, 9, 5, 1, 16, 12, 8, 4, 0]
					}
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
