
(function($){$.fn.aToolTip=function(options){var defaults={closeTipBtn:'aToolTipCloseBtn',toolTipId:'aToolTip',fixed:false,clickIt:false,inSpeed:200,outSpeed:100,tipContent:'',toolTipClass:'defaultTheme',xOffset:5,yOffset:5,onShow:null,onHide:null},settings=$.extend({},defaults,options);return this.each(function(){var obj=$(this);if(obj.attr('title')){var tipContent=obj.attr('title');}else{var tipContent=settings.tipContent;}
var buildaToolTip=function(){$('body').append("<div id='"+settings.toolTipId+"' class='"+settings.toolTipClass+"'><p class='aToolTipContent'>"+tipContent+"</p></div>");if(tipContent&&settings.clickIt){$('#'+settings.toolTipId+' p.aToolTipContent').append("<a id='"+settings.closeTipBtn+"' href='#' alt='close'>close</a>");}},positionaToolTip=function(){$('#'+settings.toolTipId).css({top:(obj.offset().top-$('#'+settings.toolTipId).outerHeight()-settings.yOffset)+'px',left:(obj.offset().left+obj.outerWidth()+settings.xOffset)+'px'}).stop().fadeIn(settings.inSpeed,function(){if($.isFunction(settings.onShow)){settings.onShow(obj);}});},removeaToolTip=function(){$('#'+settings.toolTipId).stop().fadeOut(settings.outSpeed,function(){$(this).remove();if($.isFunction(settings.onHide)){settings.onHide(obj);}});};if(tipContent&&!settings.clickIt){obj.hover(function(){$('#'+settings.toolTipId).remove();obj.attr({title:''});buildaToolTip();positionaToolTip();},function(){removeaToolTip();});}
if(tipContent&&settings.clickIt){obj.click(function(el){$('#'+settings.toolTipId).remove();obj.attr({title:''});buildaToolTip();positionaToolTip();$('#'+settings.closeTipBtn).click(function(){removeaToolTip();return false;});return false;});}
if(!settings.fixed&&!settings.clickIt){obj.mousemove(function(el){$('#'+settings.toolTipId).css({top:(el.pageY-$('#'+settings.toolTipId).outerHeight()-settings.yOffset),left:(el.pageX+settings.xOffset)});});}});};})(jQuery);

function getCSSRule(e,t){if(document.styleSheets){for(var n=0;n<document.styleSheets.length;n++){var r=document.styleSheets[n];var i=0;var s=false;do{if(r.cssRules){s=r.cssRules[i]}else{s=r.rules[i]}if(s){if(s.selectorText==e){if(t=="delete"){if(r.cssRules){r.deleteRule(i)}else{r.removeRule(i)}return true}else{return s}}}i++}while(s)}}return false}function killCSSRule(e){return getCSSRule(e,"delete")}function addCSSRule(e){if(document.styleSheets){if(!getCSSRule(e)){if(document.styleSheets[0].addRule){document.styleSheets[0].addRule(e,null,0)}else{document.styleSheets[0].insertRule(e+" { }",0)}}}return getCSSRule(e)}

/*
// devuelve el objeto para la clase "fancyStyle"
fancyStyleObject=getCSSRule('fancyStyle');
// aplica la propiedad underline a la decoración del texto del objeto anterior
fancyStyleObject.style.textDecoration='underline'
// Elimina la clase "fancyStyle" eliminado los estilos aplicados al objeto.
killCSSRule('fancyStyle');
// Crea un nueva regla stylesheet para los parrafos.
newStyle=addCSSRule('p');
// Cambia todos los parrafos anteriores al color azul.
newStyle.style.color='blue';
// Creamos una nueva CSS class llamada fancyStyle.
newStyle=addCSSRule('.fancyStyle');
// Aplicamos un fondo verde a todos los elementos con la clase fancyStyle.
newStyle.backgroundColor='green';
*/


$(document).ready(init);

var original_html_data,
	data_structure,
	data_structure_container,
	data_title,
	data_stage,
	data_buttons,
	action_buttons,
	hide,
	remove,
	removeBg;

function init()
{
	
	setHTMLStructure();
	
	if(typeof data_title != 'undefined'){setTitle();}
	if(typeof data_stage != 'undefined'){setStage();}
	
	if(typeof data_buttons != 'undefined'){data_buttons.forEach(setDataButton);}
	if(typeof action_buttons != 'undefined'){action_buttons.forEach(setActionButton);}
	
	$('#sfa_action_buttons a').aToolTip();
	
	if(typeof hide != 'undefined'){hide.forEach(itemHide);}
	if(typeof remove != 'undefined'){remove.forEach(itemRemove);}
	if(typeof removeBg != 'undefined'){removeBg.forEach(itemRemoveBg);}
	
}

function setHTMLStructure()
{
	data_structure =  '	<div id="sfa_wrapper">';
	data_structure += '		<div id="sfa_top">';
	data_structure += '			<div id="sfa_stage"></div>';
	data_structure += '			<div id="sfa_title"></div>';
	data_structure += '			<div id="sfa_logo"></div>';
	data_structure += '		</div>';
	data_structure += '		<div id="sfa_content"></div>';
	data_structure += '		<div id="sfa_action_bar">';
	data_structure += '			<div id="sfa_action_buttons"></div>';
	data_structure += '		</div>';
	data_structure += '	</div>';
	
	data_structure_container = '#sfa_content';
	
	original_html_data = $('body').html();
	
	$('body').html('');
	
	$('body').append(data_structure);
	
	$(data_structure_container).html(original_html_data);
	
/*
	$(data_structure_container).width($('#all').width());
	$(data_structure_container).height($('#all').height());
*/
}

function setTitle()
{
	if(typeof data_title === 'string')
	{
		$('#sfa_title').text(data_title.indexOf('#') == 0 ? $(data_title).text():data_title);
	}
	if(typeof data_title === 'object')
	{
		$('#sfa_title').text($(data_title).text());
		$(data_title).remove();
	}
}

function setStage()
{
	$('#sfa_stage').text(data_title);
	$('#sfa_stage').fadeIn();
}

function setDataButton(data)
{
	var id, href, title, type, text, icon, parent, position;
	
	id = typeof data.id != 'undefined' && data.id != '' ? ' id="' + data.id + '"':'';
	href = typeof data.href != 'undefined' && data.href != '' ? ' href="' + data.href + '"':'';
	title = typeof data.title != 'undefined' && data.title != '' ? ' title="' + data.title + '"':'';
	type = typeof data.type != 'undefined' && data.type != '' ? data.type:'text';
	icon = typeof data.icon != 'undefined' && data.icon != '' ? ' action_' + data.icon:'';
	text = typeof data.text != 'undefined' && data.text != '' ? data.text:'';
	
	if(id != '')
	{
		var e = '#' + data.id;
		
		position = $(e).position();
		text = $(e).text().trim() == '' ? text:$(e).text();
		type = 'text';
		
		killCSSRule(e);
		
		$(e).after('<a style="position:absolute;top:' + position.top + 'px;left:' + position.left + 'px;" ' + id + ' ' + href + ' ' + title + ' class="sfa_' + type + '_button ' + icon + '">' + text + '</a>');
		
		$(e).remove();
	}
	else
	{
		position = data.position;
		
		$(e).after('<a style="position:absolute;top:' + position.top + 'px;left:' + position.left + 'px;" ' + id + ' ' + href + ' ' + title + ' class="sfa_' + type + '_button ' + icon + '">' + text + '</a>');
	}
	
}

function setActionButton(data)
{
	var id, href, title;
	
	id = typeof data.id != 'undefined' && data.id != '' ? ' id="' + data.id + '"':'';
	href = typeof data.href != 'undefined' && data.href != '' ? ' href="' + data.href + '"':'';
	title = typeof data.title != 'undefined' && data.title != '' ? ' title="' + data.title + '"':'';
	
	if(id != '')
	{
		var e = '#' + data.id;
		
		killCSSRule(e);
		
		$(e).remove();
	}
	
	$('#sfa_action_buttons').append('<div class="sfa_action_button"><a ' + id + ' ' + href + ' ' + title + ' class="action_' + data.class + '"></a></div>');
}

function itemHide(e){$(e).hide();}
function itemRemove(e){$(e).remove();}
function itemRemoveBg(e){$(e).css('background','none');}
