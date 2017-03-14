var main

$(function(){
		
//alert($('#plantilla').length)





if($('#plantilla').length!=0){
	main = $('#plantilla');
	//alert(backgroundImage);
		main = $('#plantilla');
//	alert('waea');
	$('#all').css('background-color', 'transparent') //.fadeOut(); 
	}else{

	main = $('#all');
	//$('#all').addClass('all')

	
		}	

main.css('background-image', 'url("../__LIB/backgrounds/'+backgroundImage+'.jpg")');
//alert('foo');

if(backgroundImage != 0 && main !=  $('#all') ){
	//$('#all').css('background', 'none !important');
	//alert('if')
	}
	

var htmlTitle = $('#header').html();
var htmlT1= $('#t1').html();
$('#t1').html('');

$('#header').addClass('header');
$('.header').typer([htmlTitle]);
setTimeout(function(){
$('#t1').typer([htmlT1]);	
	
	},250)



if($('#t0').length !=0){
//$('#t0').

}
	
if($('#b_iniciar ').attr('id') == undefined){

setTimeout(function(){

$('#b_iniciar ').on('click', setIntro)


},1100)
}else{

	$('#b_iniciar ').on('click', setIntro)
}





	})// end doc ready
	

	
	function setHome(){
	//location.reload();
/*

$('.header').remove();
$('#header').addClass('header');
$('.header').remove();
		$('#header').css('background-position', '0 24px')

*/
		}
		
		
		
		
	
	function setIntro(){
	
			$('#header').removeClass('header');
		//alert('setIntro')
			var htmlsubTitle = $('#subtitulo').html();

$('#subtitulo').typer([htmlsubTitle]);

$('#b_home').on('click', setHome);	
	
		
		
		}