//(function($, window, undefined) {

var ejercicio = {

	pageControl: {

		settings: {
			$allpages: $(''),
			currentPage: 0
		},

		// DECLARAMOS LAS PÁGINAS QUE TENDRÁ EL EJERCICIO INCLUYENDO SU LÓGICA Y CONTROLES

		pages: [{
			id: 'reactivo01',
			pInitCallback: function () {
				react01.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo02',
			pInitCallback: function () {
				react02.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo03',
			pInitCallback: function () {
				react03.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo04',
			pInitCallback: function () {
				react04.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo05',
			pInitCallback: function () {
				react05.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo06',
			pInitCallback: function () {
				react06.init();
			},
			btnSiguiente: function () {
				pc.showNext();
			}
		}, {
			id: 'reactivo07',
			pInitCallback: function () {
				react07.init();
			}
		}, ],

		// FUNCIONES PARA CONTROLAR EL DESPLIEGUE DE LAS PÁGINAS DEL EJERCICIO

		showNext: function () {
			pc.settings.currentPage = pc.settings.currentPage + 1;
			pc.showPage();
		},

		showHome: function () {
			$('#page-2 .pregunta-1, #page-2 .pregunta-2, #page-2 .pregunta-3').transition({
				right: '-350px',
				x: 0
			});
			$('#page-2 .pregunta-1').transition({
				right: '0',
				x: 0
			});
			$('.puzzle .pointer').transition({
				x: 0,
				y: 0
			});
			$('.retroalimentacion').html('');
			pc.settings.currentPage = 0;
			pc.showPage();
		},

		showPage: function () {

			pc.settings.$allpages.hide();


			if (typeof pc.pages[pc.settings.currentPage].pInitCallback !== 'undefined' && typeof pc.pages[pc.settings.currentPage].pInitCallback === 'function') {
				pc.pages[pc.settings.currentPage].pInitCallback();
			}

			pc.pages[pc.settings.currentPage].$item.css('display', 'block');
		},

		init: function () {

			$(document).ready(function () {

				var $currentItem
				var i;

				for (i = 0; i < pc.pages.length; i = i + 1) {

					$currentItem = $('#' + pc.pages[i].id);
					pc.pages[i].$item = $currentItem;
					pc.settings.$allpages = pc.settings.$allpages.add($currentItem);
				}

				$('.btn-siguiente').each(function () {
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
        $("#avanzaBtn").hide();
        Helper.playAudio("react01-01.mp3", "react01.playAudio2();");
        setTimeout(function(){ $("#correoBtn").fadeIn(); }, 3000);
	},
    playAudio2 () {
        Helper.playAudio("react01-02.mp3", "react01.activateLink();");
    },
    activateLink() {
        $("#correoBtn").click(function(){
            Helper.playAudio("react01-03.mp3");
            $("#lg-back,#ventana-word").fadeIn("slow");
        })
        .css({"cursor":"pointer"});
    },
    playAudio4 () {
        Helper.playAudio("react01-04.mp3");
    },
    closeAndNext() {
        $("#lg-back,#ventana-word").hide("slow", function(){
		  $(".react01-anima01").animateSprite({
			fps: 6,
			animations: {
				jumpwindow: [0, 1, 2, 3, 4, 5, 6, 7]
			},
			loop: false
		  });
          Helper.playAudio("react01-05.mp3", "ejercicio.pageControl.showNext();");
        });

    }
};

/****************************************************************************************
 * REACT 02
 ***************************************************************************************/

var react02 = {
    personajePos: "casa-del-arbol",
	init: function () {
        Helper.playBackgroundAudio("react02-back.mp3");
        mapaHelper.trasladandose = false;
        $("#avanzaBtn").hide();
        $(".pulsa_locate").click(function(){
          mapaHelper.trasladarse(react02.personajePos, $(this).attr("id"));   
        });
	}
};

/****************************************************************************************
 * REACT 03
 ***************************************************************************************/

var react03 = {
	init: function () {
        Helper.playBackgroundAudio("react03-back.mp3");
		$('.b-ayuda-react03').on('click', function () {
                modal.show('Entrevista a las personas, utiliza el detector para saber si lo que dicen es una causa o una consecuencia del problema.');
            });
        setTimeout(function(){
          $(".personajesparque").fadeIn("slow", function(){
              Helper.playAudio("react03-01.mp3", "react03.ocultarPersonajes();");
          });
        }, 3000);
	},
    faltanDeResolver: 0,
    ocultarPersonajes: function() {
        $(".personajesparque").fadeOut("slow");

        // Al ocultar los personajes activamos el click a las personas
        $(".personaspeech").bind("click", function(){
          $(".globo01,.globo02").hide();
          var globoSelector = ".g-" +  $(this).attr("class").replace(' personaspeech', '') ;   
          $(globoSelector).show();
        });

        // Y también añadimos el evento a los botones de respuesta
        react03.respuestas.forEach(function(elem){
            // llevamos la cuenta de cuantos personajes hay
            react03.faltanDeResolver++;
            $(".g-" + elem.personaje + " .b-optionA").click(function(){
                $(".globo01,.globo02").hide();
                modal.show(elem.causa.texto);
                if(elem.causa.correcto == true) {
                    // si es la respuesta correcta deactivamos al personaje
                    $("." + elem.personaje).unbind("click");
                    // si ya se resolvieron todos regresamos al mapa al cerrar el modal
                    react03.faltanDeResolver--;
                    if(react03.faltanDeResolver < 1) {
                        $(".close-modal").click(react03.regresarMapa);
                    }
                }
            });
            $(".g-" + elem.personaje + " .b-optionB").click(function(){
                $(".globo01,.globo02").hide();
                modal.show(elem.consecuencia.texto);
                if(elem.consecuencia.correcto == true) {
                    // si es la respuesta correcta desactivamos al personaje
                    $("." + elem.personaje).unbind("click");
                    react03.faltanDeResolver--;
                    if(react03.faltanDeResolver < 1) {
                    // si ya se resolvieron todos regresamos al mapa al cerrar el modal
                        $(".close-modal").click(react03.regresarMapa);
                    }
                }
            });
        });
    },
    regresarMapa: function regresarMapa() {
            Helper.finalizarReactivo("parque"); 
            $(".close-modal").unbind("click", react03.regresarMapa);
    },
    respuestas: [
        {
            "personaje": "anciano",
            "causa" : {
                 "texto": "¡Miau!, claro, el comprar mascotas y luego abandonarlas es una de las causas del problema.",
                 "correcto": true
             },
             "consecuencia": {
                 "texto": "¿El abandono es una consecuencia del problema? Quizás necesitas más información.",
                 "correcto": false
             }
        },
        {
            "personaje": "senora",
            "causa" : {
                 "texto": "Los animales causan las heces, pero esto es consecuencia de un problema más grande.",
                 "correcto": false
             },
             "consecuencia": {
                 "texto": "Estás en lo cierto, esto es una consecuencia del abandono de mascotas.",
                 "correcto": true
             }
        },
        {
            "personaje": "nino",
            "causa" : {
                 "texto": "¡Miautástico!, esta es una de las causas del problema.",
                 "correcto": true
             },
             "consecuencia": {
                 "texto": "La reproducción sin control no parece ser una consecuencia del problema.",
                 "correcto": false
             }
        },
        {
            "personaje": "nina",
            "causa" : {
                 "texto": "La falta de comida no parece ser una causa del problema de los animales abandonados.",
                 "correcto": false
             },
             "consecuencia": {
                 "texto": "¡Prrrrrrfecto! Como consecuencia del abandono, estos animales no tienen qué comer.",
                 "correcto": true
             }
        },
        {
            "personaje": "ninaperro",
            "causa" : {
                 "texto": "Los gatitos están enfermos como resultado del abandono.",
                 "correcto": false
             },
             "consecuencia": {
                 "texto": "¡Miauexcelente!, cuando la gente tira a sus mascotas las expone a padecer enfermedades.",
                 "correcto": true
             }
        },
        {
            "personaje": "vagabundo",
            "causa" : {
                 "texto": "Claro, una de las causas del problema es que los animalitos se reproduzcan sin control.",
                 "correcto": true
             },
             "consecuencia": {
                 "texto": "El hecho de que no haya albergues no es una consecuencia del abandono de gatos.",
                 "correcto": false
             }
        },
        {
            "personaje": "policia",
            "causa" : {
                 "texto": "Los animales sin dueño nos pueden contagiar enfermedades, pero esa no es la causa del problema.",
                 "correcto": false
             },
             "consecuencia": {
                 "texto": "¡Miautástico!, si estos animales son abandonados, como consecuencia nos pueden contagiar enfermedades.",
                 "correcto": true
             }
        }
    ]
};

/****************************************************************************************
 * REACT 04
 ***************************************************************************************/

var react04 = {
	init: function () {
		$('.b-ayuda-react04').on('click', function () {
                modal.show('Interroga a los gatos, para saber lo que dicen mueve la cámara traductora sobre ellos. Si consideras que lo que dicen es un argumento, haz clic en el obturador para tomarles una foto.');
            });
        setTimeout(function(){
            $(".personajeslote").fadeIn("slow");
            Helper.playAudio("react04-01.mp3", "react04.ocultarPersonajes();");
        }, 3000);
	},
    gatosFaltantes: 5,
    ocultarPersonajes() {
        $(".personajeslote").fadeOut("slow");

        // al ocultar los personajes agregamos la función al hover de los gatos
        $(".gato").bind("mouseover", function(){
          var gatoId = $(this).attr("data-gato-id");
          react04.gatoActual = gatoId;
          var position = $(this).position();
          var iTop = position.top + $(this).height();
          $(".camara").css({"top": iTop - 215, "left": position.left - 80});
          $(".camara").fadeIn();
          $(".camara p").text(react04.gatos[gatoId].texto);
        })

        // Agregamos la función que verifica la info del gato al que se le hizo hover cuando se da click al obturador
        $(".obturador").click(function(){
          var gatoId = react04.gatoActual;
          if (typeof gatoId !== "undefined") {
            modal.show(react04.gatos[gatoId].retro);
            if(react04.gatos[gatoId].argumento === true) {
                react04.gatosFaltantes--;
                $(".gato[data-gato-id='" + gatoId + "']").unbind("mouseover");
                if(react04.gatosFaltantes < 1) {
                    $(".close-modal").click(react04.regresarMapa);
                }
            }
            $(".camara").fadeOut();
          }
        });
    },
    gatoActual: undefined,
    regresarMapa: function regresarMapa() {
            Helper.finalizarReactivo("lote-baldio"); 
            $(".close-modal").unbind("click", react04.regresarMapa);
    },
    gatos: {
      "1": {
          texto: "Los humanos deberían tratarnos como reyes, en vez de eso, nos tiran a la calle",
          retro: "El gato tiene razón en estar molesto, pero no es un argumento que podamos usar en nuestra queja.",
          argumento: false
      },
      "2": {
          texto: "La otra vez leí en el periódico que si las personas siguen abandonando a los animales, en 5 años será un problema de salud pública.",
          retro: "Este argumento está basado en información comprobable, muy bien.",
          argumento: true
      },
      "3": {
          texto: "Sólo 30% de los gatos de este vecindario tienen un hogar de acuerdo con el Instituto de Salud Animal.",
          retro: "Excelente, este argumento presenta datos basados en información sustentada por una autoridad",
          argumento: true
      },
      "4": {
          texto: "Un gato cayó en un plato. Su cola se hizo fideo, sus tripas se hicieron pan",
          retro: "Los argumentos deben basarse en hechos, datos, ejemplos o en una autoridad. Esta parece una canción infantil.",
          argumento: false
      },
      "5": {
          texto: "Si un gato dormido cae de una rama en medio del bosque y nadie lo escucha, ¿existe?",
          retro: "Este gato es muy filosófico, pero no tiene un argumento que podamos presentar.",
          argumento: false
      },
      "6": {
          texto: "He escuchado que hay ciudades donde duermen a los gatitos callejeros. Pero esa no es la solución.",
          retro: "Muy bien, soldado, este argumento será útil para el Comando Miau.",
          argumento: true
      },
      "7": {
          texto: "En Ciudad Garra, el Municipio implementó un programa de adopción de gatos callejeros. Creo que podría funcionar aquí.",
          retro: "Bien, además de ser un argumento es también una propuesta de solución",
          argumento: true
      },
      "8": {
          texto: "Si se informara a la gente de las causas y consecuencias de echar un animal a la calle, lo pensaría dos veces.",
          retro: "Este gato sí sabe, esta información nos servirá para argumentar nuestra queja.",
          argumento: true
      }
    }
};

/****************************************************************************************
 * REACT 05
 ***************************************************************************************/

var react05 = {
	init: function () {
        Helper.playAudio("react05-01.mp3", "react05.animacion();");
		$('.b-ayuda-react05').on('click', function () {
                modal.show('Ordena las oraciones que están mal con la herramienta guante y corrige la ortografía con la herramienta borrador. Cuando pienses que el texto está listo, haz clic en el icono de entregar.');
            });

		$(document).on('blur','#txt_editable', function(e){
			var name = $(this).val();
            var newValue;
			var divId = $(this).attr("data-div-id");
            
            if (react05.palabras[divId] == name) {
                newValue = name;
                modal.show("Bien hecho, esto le dará una mejor presentación a nuestra queja.");
                $("#" + divId).removeClass("wrong-word");
                $("#" + divId).unbind("click");
            } else {
                modal.show("Quizás deberías consultar el diccionario para corregir esta palabra.");
                newValue = $(this).attr("data-original");;
            }

            e.stopPropagation();
			$("#" + divId).text(newValue);
            $(this).remove();
		});
	},
    animacion: function () {
		$(".react05-anima01").animateSprite({
			fps: 6,
			animations: {
				jumpwindow: [0, 1, 2, 3, 4, 5, 6, 7]
			},
			loop: false,
			complete: function () {
				Helper.shuffle();
				$(".lg-back,.ventana-queja,.b-mano,.b-goma,.b-entregar").show();
			}
		});
    },
	activarArrastre() {
        $(".wrong-word").unbind("click");
        $(".sortable p").unbind("click");
		$(".b-mano").css("background-image","url('img/react05/react05-manob.png')");
		$(".b-goma").css("background-image","url('img/react05/react05-goma.png')");
		$('.sortable').sortable("enable");
	},
    activarEditar() {
		$(".wrong-word").bind("click", function(e){
			var name = $(this).text();
			var divId = $(this).attr('id');

			$(this).html('');
			$('<input/>')
				.attr({
					'type': 'text',
					'id': 'txt_editable',
					'size': '15',
					'value': name,
                    'data-div-id': divId,
                    'data-original': name
				})
				.insertAfter("#" + divId);
			$('#txt_editable').focus();
		});
        $(".sortable p").click(function(e){
            if(!$(e.target).is("input") && !$(e.target).is("span") ) {
                modal.show("Esta palabra no tiene faltas de ortografía. Prueba con otra.");   
            }
        });

		$('.sortable').sortable("disable");
		$(".b-goma").css("background-image","url('img/react05/react05-gomab.png')");
		$(".b-mano").css("background-image","url('img/react05/react05-mano.png')");
    },
    evaluarEjercicio() {
        // Evaluamos si el orden está correcto y ya no hay palabras con error
        if (react05.evalOrden() && !$(".wrong-word")[0]) {
            modal.show('!Felino!, eso le dará coherencia a la queja que presentaremos.');

            $(".close-modal").click(react05.pantallaFinal);
        } else {
            modal.show('Tal vez deberías buscar otra forma de estructurar la queja.');
        }
    },
    pantallaFinal: function pantallaFinal() {
			pc.settings.currentPage = 6;
			pc.showPage();
            $(".close-modal").unbind("click", react05.pantallaFinal);
    },
    evalOrden() {
        var expected_selector;

        for(var i = 1; i < 12; i++) {
            if (i < 10) {
                expected_class = "react05-op0" + i;
            } else {
                expected_class = "react05-op" + i;
            }

            if (!$(".draggable:nth-child(" + i + ")").hasClass(expected_class)) {
                return false;
            }
        }
        return true;
    },
    palabras: {
        word1: "hambre",
        word2: "albergues",
        word3: "esterilizarlos",
        word4: "enfermedades",
        word5: "sirva",
        word6: "solución",
        word7: "Organizar",
        word8: "Ciudad"
    }
};

/****************************************************************************************
 * REACT 06
 ***************************************************************************************/

var react06 = {
	init: function () {
		
	}
};

/****************************************************************************************
 * REACT 07
 ***************************************************************************************/

var react07 = {
	init: function () {
		$('.b-ayuda-react06').on('click', function () {
                modal.show('Lorem.');
            });
		 $('.btn-siguiente').hide();
	}
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
	init: function () {}
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
	shuffle () {
		$('.draggable').shuffle();
		$('.sortable').sortable({ disabled: true});
	},
    finalizarReactivo(nombreReactivo) {
        Helper.stopBackgroundAudio();
        pc.settings.currentPage = 1;
        pc.showPage();
        $("#" + nombreReactivo).attr('class', '');

        Helper.reactivosFinalizados.push(nombreReactivo);

        if (Helper.reactivosFinalizados.length == 2) {
            $("#municipio").show();
        }
    },
    reactivosFinalizados: []
};

/****************************************************************************************
 * Helper para moverse por el mapa del reactivo 02
 ***************************************************************************************/
 var mapaHelper = {
    trasladandose: false,
    trasladarse(inicio, destino) {
      if(this.trasladandose !== true) {
        this.trasladandose = true;

        // empieza la animación del personaje corriendo
		$(".personajesmapa").animateSprite({
			fps: 6,
			animations: {
				walkRight: [0, 1, 2, 3, 4, 5, 6, 7],
				walkLeft: [15, 14, 13, 12, 11, 10, 9, 8]
			},
			loop: true
		});

        switch (inicio) {
          case "casa-del-arbol":
              switch (destino) {
                case "parque":
                  this.casaAlCentro(this.centroAlParque);
                  break;
                case "lote-baldio":
                  this.casaAlCentro(this.centroAlLote);
                  break;
                case "espectacular":
                  this.casaAlCentro(this.centroAlEspectacular);
                  break;
              }
            break;
          case "parque":
              switch (destino) {
                case "lote-baldio":
                  this.parqueAlCentro(this.centroAlLote);
                  break;
                case "municipio":
                  this.parqueAlCentro(this.centroAlMunicipio);
                  break;
                case "espectacular":
                  this.centroAlEspectacular();
                  break;
              }
            break;
          case "lote-baldio":
              switch (destino) {
                case "parque":
                  this.loteAlCentro(this.centroAlParque);
                  break;
                case "municipio":
                  this.centroAlMunicipio();
                  break;
                case "espectacular":
                  this.loteAlCentro(this.centroAlEspectacular);
                  break;
              }
            break;
          case "espectacular":
              switch (destino) {
                case "parque":
                  this.centroAlParque();
                  break;
                case "municipio":
                  this.espectacularAlCentro(this.centroAlMunicipio);
                  break;
                case "lote-baldio":
                  this.espectacularAlCentro(this.centroAlLote);
                  break;
              }
            break;
        }
      }
    },
    casaAlCentro(callback) {
		$(".personajesmapa").animateSprite('play', 'walkLeft');
        $(".personajesmapa").animate({left: "558px", top: "290px"}, 'slow', 'linear', function(){
		  $(".personajesmapa").animateSprite('stop');
          $(".personajesmapa").animate({left: "426px", top: "188px"}, 800, 'linear', callback);
        });
    },
    parqueAlCentro(callback) {
		$(".personajesmapa").animateSprite('play', 'walkLeft');
        $(".personajesmapa").animate({left: "341px", top: "124px"}, 'slow', 'linear', function(){
          $(".personajesmapa").animate({left: "426px", top: "188px"}, 800, 'linear', function(){
            $(".personajesmapa").animateSprite("stop");
            callback();
          });
        });
    },
    loteAlCentro(callback) {
		$(".personajesmapa").animateSprite('play', 'walkRight');
        $(".personajesmapa").animate({left: "426px", top: "188px"}, 600, 'linear', function(){
            $(".personajesmapa").animateSprite("stop");
            callback();
          });
    },
    espectacularAlCentro(callback) {
		$(".personajesmapa").animateSprite('play', 'walkRight');
        $(".personajesmapa").animate({left: "426px", top: "188px"}, 600, 'linear', function(){
            $(".personajesmapa").animateSprite("stop");
            callback();
          });
    },
    centroAlParque() {
		$(".personajesmapa").animateSprite('play', 'walkRight');
        $(".personajesmapa").animate({left: "341px", top: "124px"}, 'slow', 'linear', function(){
		  $(".personajesmapa").animateSprite('stop');
		  $(".personajesmapa").animateSprite('play', 'walkRight');
          $(".personajesmapa").animate({left: "481px", top: "48px"}, 800, 'linear', function(){
            $(".personajesmapa").animateSprite('stop');
            $(".personajesmapa").animateSprite('frame', 0);
            react02.personajePos = 'parque';
			pc.settings.currentPage = 2;
			pc.showPage();
          });
        });
    },
    centroAlLote() {
		$(".personajesmapa").animateSprite('play', 'walkLeft');
          $(".personajesmapa").animate({left: "311px", top: "227px"}, 600, 'linear', function(){
            $(".personajesmapa").animateSprite('stop');
            $(".personajesmapa").animateSprite('frame', 0);
            react02.personajePos = 'lote-baldio';
			pc.settings.currentPage = 3;
			pc.showPage();
            Helper.stopBackgroundAudio();
          });
    },
    centroAlMunicipio() {
		$(".personajesmapa").animateSprite('stop');
		$(".personajesmapa").animateSprite('play', 'walkLeft');
          $(".personajesmapa").animate({left: "140px", top: "297px"}, 800, 'linear', function(){
            $(".personajesmapa").animateSprite('stop');
            $(".personajesmapa").animateSprite('frame', 0);
            react02.personajePos = 'municipio';
			pc.settings.currentPage = 4;
			pc.showPage();
            Helper.stopBackgroundAudio();
          });
    },
    centroAlEspectacular() {
		$(".personajesmapa").animateSprite('play', 'walkLeft');
          $(".personajesmapa").animate({left: "221px", top: "99px"}, 800, 'linear', function(){
            $(".personajesmapa").animateSprite('stop');
            $(".personajesmapa").animateSprite('frame', 1);
            react02.personajePos = 'espectacular';
			pc.settings.currentPage = 5;
			pc.showPage();
            Helper.stopBackgroundAudio();
          });
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
